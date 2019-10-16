import errorHandler from '@core/error.handler'
import { messagesRes } from '@core/message'
import { PERMISSON_NAME, validatePermission } from '@core/permission';
const DB = require('@models');

async function getAPriceDetail(req, res) {
    const body = req.body;
    const isValid = await validatePermission(req,res,PERMISSON_NAME.GET_ALL_PRICE_DETAIL);
    if (isValid) {
        // code logic
        const priceDetail = await DB.PriceDetail.findAll({
            where: {
                is_deleted: false,
                plist_id: body.plist_id
            },
            raw: true
        });
        if (priceDetail.length > 0) {
            const counterType = await DB.CounterType.findAll({
                where: {
                    is_deleted: false
                },
                raw: true
            });
            if (counterType) {
                priceDetail.forEach(pd => {
                    pd["type_name"] = counterType.filter(c => c.id === pd.type_id)[0].name;
                })
            }
            res.status(200).send(messagesRes(200, "OK!", { price_details: priceDetail }));
        } else {
            res.status(200).send(messagesRes(400, "Not found!"));
        }
    }
}

async function createPriceDetail(req, res) {
    const body = req.body;
    const isValid = await validatePermission(req, res, PERMISSON_NAME.CREATE_PRICE_DETAIL);
    if (isValid) {
        const exist = await DB.PriceDetail.findAll({
            where:{
                plist_id: body.plist_id,
                type_id: body.type_id
            },
            raw: true
        });
        if (exist.length == 0) {
            let listDetail = [];
            body.data.forEach(detail => {
                detail["is_deleted"] = false;
                detail["plist_id"] = body["plist_id"];
                detail["type_id"] =  body["type_id"];
                listDetail.push(detail);
            });
            await DB.PriceDetail.bulkCreate(listDetail,{ returning: true }).then(result => {
                res.status(201).send(messagesRes(201, "OK!", { price_details: result }));
            }).catch(err => {
                res.status(200).send(messagesRes(400, "Create failed!"));
            });
        } else {
            res.status(200).send(messagesRes(400, "Data existed!"));
        }
        
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

export default errorHandler({ getAPriceDetail, createPriceDetail,  deletePriceDetail, updatePriceDetail });
