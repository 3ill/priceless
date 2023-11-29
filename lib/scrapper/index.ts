import axios from 'axios'
import * as cheerio from 'cheerio'
import { getErrorMessage } from '../actions/handleError'
import { extractPrice, extractCurrency, extractDescription } from '../utils'

export async function scrapeAmazonProduct(productUrl: string) {
  if (!productUrl) return

  const username = String(process.env.BRIGHT_DATA_USERNAME)
  const password = String(process.env.BRIGHT_DATA_PASSWORD)

  const port = 22225
  const session_id = (1000000 * Math.random()) | 0
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: `brd.superproxy.io`,
    port,
    rejectUnauthorized: false,
  }

  try {
    const response = await axios.get(productUrl, options)
    const $ = cheerio.load(response.data)

    const title = $('#productTitle').text().trim()

    const currentPrice = extractPrice(
      $('span.a-price-whole'),
      $('span.a-offscreen'),
    )

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price'),
    )

    const outOfStock =
      $('#availability span').text().trim().toLowerCase() ===
      'currently unavailable'

    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}'

    const imageUrls = Object.keys(JSON.parse(images))
    const currency = extractCurrency($('.a-price-symbol'))

    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '')

    const description = extractDescription($('.a-description'))

    console.log(description)
    const data = {
      productUrl,
      currency: currency || '$',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'category',
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    }

    console.log(data)
    return data
  } catch (error) {
    return getErrorMessage(error)
  }
}