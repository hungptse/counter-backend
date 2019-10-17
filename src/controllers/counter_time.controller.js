import errorHandler from '@core/error.handler'
import { messagesRes } from '@core/message'
import { PERMISSON_NAME, validatePermission } from '@core/permission';
import { Op } from 'sequelize'

const DB = require('@models');


async function getAllCounterTime(req, res) {
    const isValid = await validatePermission(req, res, PERMISSON_NAME.GET_ALL_COUNTER_TIME);
    if (isValid) {
        const counterTime = await DB.CounterTime.findAll({
            where: {
                is_deleted: false
            },
            raw: true
        });
        if (counterTime != null) {
            const counter = await DB.Counter.findAll({
                where: {
                    is_deleted: false
                },
                raw: true
            });
            const counterType = await DB.CounterType.findAll({
                where: {
                    is_deleted: false
                },
                raw: true
            });
            const user = await DB.User.findAll({
                where: {
                    is_deleted: false
                },
                raw: true
				});
				const store = await DB.Store.findAll({
					attributes: ['id', 'name', 'address', 'company_id'],
					where: {
						 is_deleted: false,
					},
					raw: true
			  });
            // get User name & Counter type name & Store info for Counter Time
				//-- link Counter Type name & Store info to Counter
				counter.forEach(c => {
					c["type_name"] = counterType.filter(t => t.id === c.type_id)[0].name;
					c["store"] = store.filter(s => s.id === c.store_id)[0];
			  });
				//-- link User, Counter and Store to Counter Time
            counterTime.forEach(ct => {
               ct["counter_type"] = counter.filter(c => c.id === ct.counter_id)[0].type_name;
					ct["created_by_name"] = user.filter(u => u.username === ct.created_by)[0].name;
					ct["in_store"] = counter.filter(c => c.id === ct.counter_id)[0].store;
            })             
        }
        if (counterTime.length > 0) {
            res.status(200).send(messagesRes(200, "OK", { items: counterTime, total: counterTime.length }));
        } else {
            res.status(200).send(messagesRes(400, "Not found!"));
        }
    }

}

async function createCounterTime(req, res) {
    const body = req.body;
    body["is_deleted"] = false;
    const isValid = await validatePermission(req, res, PERMISSON_NAME.CREATE_COUNTER_TIME)
    if (isValid) {
        const today = new Date().toISOString().slice(0,10);
        await DB.CounterTime.findOrCreate({
            where: {
                counter_id: body["counter_id"],
                created_at: {
                    [Op.contains] : today
                }
            },
            defaults: body
        }).then(([counterTime, isCreated]) => {
            
            if (!isCreated) {
                res.status(200).send(messagesRes(400, "Not created!"));
            } else {
                res.status(200).send(messagesRes(200, "Counter Time Created", counterTime.get({ plain: true })));
            }
        })
    }


}

export default errorHandler({ getAllCounterTime, createCounterTime });