import mongoose from 'mongoose';

const tagObject = new mongoose.Schema({
    name: { type: String, required: true },
    count: { type: Number, required: true }
});

const tagSchema = new mongoose.Schema({
    tagsFlysquirr: [tagObject],
    tagsRobert: [tagObject]
}, { strict: false });

const TagsModel = mongoose.model("tags", tagSchema);

export default TagsModel;