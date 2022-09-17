import mongoose from "mongoose";
import dbConnect, { connection } from "../../../utils/dbConnect";
import Grid from "gridfs-stream";
import handler from "../../../utils/handler";
import isFileExist from "../../../utils/isFileExist";

dbConnect();

handler.get((req, res) => {
  let bucket = new mongoose.mongo.GridFSBucket(connection.db, {
    chunkSizeBytes: 1024,
    bucketName: "music",
  });

  const gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("music");

  gfs.files.findOne(
    { _id: new mongoose.Types.ObjectId(req.query.id) },
    (err: any, file: any) => {
      console.log(file);
      isFileExist(file, res);
    }
  );
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
