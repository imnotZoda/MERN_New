const Product = require('../models/Product');
const cloudinary = require('cloudinary');
const upload = require ('../utils/upload');



exports.create = async (req, res, next) => {

    try {

        req.body.images = await upload.multiple(req.files);


        const product = await Product.create(req.body);

        res.json({
            message: "Product Created Successfuly",
            product: product,
        })
    } catch (error) {
        console.log(error);
    }
}

exports.update = async (req, res, next) => {

    try {

        // console.log(req.body)
        // console.log(req.params)
        //console.log(req.files)

        const images = req.files;

        req.body.images = [];


        for (let i = 0; i < images.length; i++) {


            const data = await cloudinary.v2.uploader.upload(images[i].path);

            req.body.images.push({

                public_id: data.public_id,
                url: data.url,

            })
        };

        if (images.length === 0) {
            delete req.body.images
        }

        const product = await Product.findByIdAndUpdate(req.params.id, req.body);

        res.json({
            message: "Product Updated",
            product: product
        })

    } catch (error) {
        console.log(error);
    }
}

exports.getSingle = async (req, res, next) => {

    try {

        const product = await Product.findById(req.params.id)
            // .populate({
            //     path: 'category',
            //     model: 'Category'

            // });

        return res.json({
            message: "Data Available",
            product: product,
        })

    } catch (error) {

        console.log(error);
        return res.json({
            message: "Error",
            success: false,
        })

    }
}

exports.all = async (req, res, next) => {
    try {
        const { priceRange, category, page = 1, limit = 0 } = req.query;
        const filter = {};

        // Price Range Filter
        if (priceRange) {
            const priceRanges = priceRange.split(',');
            const priceConditions = [];

            if (priceRanges.includes('100-5000')) {
                priceConditions.push({ sell_price: { $gte: 100, $lte: 5000 } });
            }
            if (priceRanges.includes('5000-10000')) {
                priceConditions.push({ sell_price: { $gte: 5000, $lte: 10000 } });
            }
            if (priceRanges.includes('10000-15000')) {
                priceConditions.push({ sell_price: { $gte: 10000, $lte: 15000 } });
            }
            if (priceRanges.includes('15000-20000')) {
                priceConditions.push({ sell_price: { $gte: 15000, $lte: 20000 } });
            }

            if (priceConditions.length > 0) {
                filter.$or = priceConditions;
            }
        }

        // Category Filter
        if (category) {
            const categories = category.split(',');
            filter.category = { $in: categories };
        }

        const products = await Product.find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalProducts = await Product.countDocuments(filter);


        res.json({
            products,
            currentPage: Number(page),
            totalPages: Math.ceil(totalProducts / limit),
        });
        
    } catch (error) {
        console.log(error);
        return res.json({
            message: "Error",
            success: false,
        });
    }
};




exports.delete = async (req, res, next) => {
    try {

        await Product.findByIdAndDelete(req.params.id);
        res.json({
            message: "Deleted Product"
        })

    } catch (error) {

        console.log(error);
        return res.json({
            message: "Error",
            success: false,
        })
    }
}

// exports.bulkDelete = async (req, res, next) => {
//     // try {

//     //     // console.log(req.body.productIds);

//     //     await Product.deleteMany({
//     //         _id: {
//     //             $in: req.body.productIds, //%in array pang store ng iddedelete na product id
//     //         }
//     //     });

//     //     res.json({
//     //         message: "Products deleted successfully!",
//     //     })

//     // } catch (error) {

//     //     console.log(error);

//     //     return res.json({
//     //         message: 'System error occured.',
//     //         success: false,
//     //     })

//     // }
// }
exports.bulkDelete = async (req, res, next) => {
    try {
      // Logging for debugging
      console.log(req.body.productIds);
  
      // Ensure the `productIds` array is passed correctly
      await Product.deleteMany({
        _id: { $in: req.body.productIds }
      });
  
      res.json({
        message: "Products deleted successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        message: 'System error occurred.',
        success: false,
      });
    }
  }
  

  