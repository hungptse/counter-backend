import errorHandler from '@core/error.handler'
import { messagesRes } from '@core/message'
import { PERMISSON_NAME, validatePermission } from '@core/permission';
import { Handlers } from '@sentry/node';


const DB = require('@models');
async function getAllCompany(req, res) {
    const isValid = await validatePermission(req, res, PERMISSON_NAME.GET_ALL_COMPANY);
    if (isValid) {
        const company = await DB.Company.findAll({
            where: {
                is_deleted: false
            },
            raw: true

        });

        if (company.length > 0) {
            res.status(200).send(messagesRes(200, "OK", {
                company: company
            }));
        } else {
            res.status(200).send(messagesRes(400, "Not found"))
        }
    }

}

async function createCompany(req, res) {
    const body = req.body;
    body["is_deleted"] = false;
    const isValid = await validatePermission(req, res, PERMISSON_NAME.CREATE_COMPANY);
    if (isValid) {
        await DB.Company.findOrCreate({
            where: {
                name: body["name"],
                address: body["address"],
            },
            defaults: body
        }).then(([company, isCreate]) => {
            if (!isCreate) {
                res.status(200).send(messagesRes(200, "Company already exist!"))
            } else {
                res.status(200).send(messagesRes(200, "Company create!", company.get({ plain: true })));
            }
        });
    }
}

async function updateCompany(req, res) {
    const id = req.params.id;
    const body = req.body;

    const company = await DB.Company.findByPk(id);
    if (company) {
        company["name"] = body["name"];
        company["address"] = body["address"];
        company.save().then(() => {
            res.status(200).send(messagesRes(200, "Updated company", company));
        })
    } else {
        res.status(200).send(messagesRes(400, "Not found"));
    }

}

export default errorHandler({ getAllCompany, createCompany , updateCompany });