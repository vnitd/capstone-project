import mongoose from "mongoose";
import { Class } from "../models/class.model.js";
import classSchema from "../schemas/class.schema.js";

async function createClass(data: Class) {
	try {
		// create mongo record
		const res = await classSchema.create<Class>(data);

		return {
			status: 200,
			result: res,
		};
	} catch (err: any) {
		if (err?.errors?.name)
			return { status: 400, result: err?.errors?.name.message };
		if (err?.errors?.teacher)
			return { status: 400, result: err?.errors?.teacher.message };
		throw err;
	}
}

async function getClass(id: string): Promise<any> {
	try {
		const res = await classSchema.findOne({
			_id: new mongoose.Types.ObjectId(id),
		});

		if (res == null) {
			return {
				status: 400,
				result: "INFO_NOT_FOUND",
			};
		}

		return {
			status: 200,
			result: res,
		};
	} catch (err: any) {
		throw err;
	}
}

async function updateClass(id: string, data: any): Promise<any> {
	try {
		const res = await classSchema.findOneAndUpdate(
			{ _id: new mongoose.Types.ObjectId(id) },
			{ $set: data },
			{ new: true, runValidators: true }
		);

		if (!res) {
			return {
				status: 400,
				result: "INFO_NOT_FOUND",
			};
		}
		return {
			status: 200,
			result: res,
		};
	} catch (err: any) {
		throw err;
	}
}

async function deleteClass(id: string): Promise<any> {
	try {
		// Tìm và xóa bản ghi theo id
		const res = await classSchema.findOneAndDelete({
			_id: new mongoose.Types.ObjectId(id),
		});

		if (!res) {
			return {
				status: 400,
				result: "INFO_NOT_FOUND",
			};
		}
		return {
			status: 200,
			result: "DELETE_SUCCESS",
		};
	} catch (err: any) {
		throw err;
	}
}

export { createClass, getClass, updateClass, deleteClass };
