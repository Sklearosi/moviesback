import mongoose from "mongoose";

const connect = async () => {
    try {
        const url = process.env.MONGO_URL!;
        mongoose.connect(url);
    } catch (error) {
     console.log(error);
     return error
    }
}

export default connect;