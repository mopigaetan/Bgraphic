const mongoose=require('mongoose');


const articleSchema=mongoose.Schema(
{
    title: String,
    subTitle:String,
    smallDescription:String,
    description: String,
    published: Boolean,
    author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
    },
    publishDate: {type: Date, default: Date.now}, 
    imageUrls:[{}],
  },
  { timestamps: true }
);

module.exports=mongoose.model('Article',articleSchema)