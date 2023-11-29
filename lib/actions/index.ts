'use server'

import { revalidatePath } from 'next/cache'
import { scrapeAmazonProduct } from '../scrapper'
import { getErrorMessage } from './handleError'
import { connectToDB } from '../mongoose'
import { getHighestPrice, getLowestPrice, getAveragePrice } from '../utils'
import Product from '../models/product.model'

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return

  try {
    connectToDB()
    const scrapedProduct = await scrapeAmazonProduct(productUrl)
    if (!scrapedProduct) return

    let product = scrapedProduct

    if (typeof scrapedProduct === 'object' && 'productUrl' in scrapedProduct) {
      const existingProduct = await Product.findOne({
        url: scrapedProduct.productUrl,
      })

      //? checking if the product exists and updating price details
      if (existingProduct) {
        const updatedPriceHistory: any = [
          ...existingProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ]

        product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        }
      }

      //? Adds new product to the DB
      if (product) {
        const newProduct = await Product.findOneAndUpdate(
          { url: scrapedProduct.productUrl },
          product as any,
          { upsert: true, new: true },
        )

        revalidatePath(`/products/${newProduct._id}`)
      }
    }
  } catch (error) {
    return getErrorMessage(error)
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB()

    const product = await Product.findOne({ _id: productId })
    if (!product) return null

    return product
  } catch (error) {
    console.log(error)
    return getErrorMessage(error)
  }
}

export async function getAllProducts() {
  try {
    connectToDB()
    const products = await Product.find()

    return products
  } catch (error) {
    console.error(error)
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToDB()
    const currentProduct = await Product.findById(productId)

    if (!currentProduct) return null

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3)

    return similarProducts
  } catch (error) {
    console.error(error)
  }
}
