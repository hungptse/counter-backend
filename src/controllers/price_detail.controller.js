import errorHandler from '@core/error.handler'
import { messagesRes } from '@core/message'
import { PERMISSON_NAME, validatePermission } from '@core/permission';
const DB = require('@models');

async function getAllPriceDetail(req, res) {
    const isValid = await validatePermission(req,res,PERMISSON_NAME.GET_ALL_PRICE_DETAIL);
    if (isValid) {
        // code logic
        const price_detail = await DB.PriceDetail.findAll({
            where: {
                is_deleted: false
            },
            raw: true
        });
        if (price_detail.length > 0) {
            res.status(200).send(messagesRes(200, "OK!", { price_detail: price_detail }));
        } else {
            res.status(200).send(messagesRes(400, "Not found!"));
        }
    }
}

async function createPriceDetail(req, res) {
    const body = req.body;
    body["is_deleted"] = false;
    const isValid = await validatePermission(req, res, PERMISSON_NAME.CREATE_PRICE_DETAIL);
    if (isValid) {
        await DB.PriceDetail.findOrCreate({
            where: {
                plist_id: body.plist_id,
                type_id: body.type_id
            },
            defaults: body
        }).then(async ([price_detail, isCreated]) => {
            if (!isCreated) {
                res.status(200).send(messagesRes(400, "Price detail already in app"));
            } else {
                res.status(200).send(messagesRes(200, "Price detail created", price_detail.get({ plain: true })));
            }
        })
    }
}

async function updatePriceDetail(req, res) {
    
}

async function deletePriceDetail(req, res) {
    // const body = req.body;
    // await DB.PriceDetail.findOne({
    //     where: {
    //         id: body.id,
    //     },
    // }).then(async price_detail => {
    //     if (!price_detail) {
    //         res.status(200).send(messagesRes(400, "Price detail not found"));
    //     } else {
    //         price_detail["is_deleted"] = true;
    //         price_detail.save().then(() => {
    //             res.status(200).send(messagesRes(200, "Deleted price detail"));
    //         })
    //     }
    // });
}

export default errorHandler({ getAllPriceDetail, createPriceDetail,  deletePriceDetail, updatePriceDetail });
