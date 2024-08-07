import mongoose from "mongoose";

export const bookSchema = mongoose.Schema(

    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        },
        imagePath: {
      type: String,
      
    },
    },
    {
        timestamps: true,
    }

);

export const Book = mongoose.model('Book', bookSchema);