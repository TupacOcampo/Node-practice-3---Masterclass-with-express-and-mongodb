const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true, 'Title required'],
    },
    description:{
        type:String,
        required:[true, 'Desctription required']
    },
    weeks:{
        type:String,
        required:[true, 'Weeks required']
    },
    tuition:{
        type:String,
        required:[true, 'Tuition cost required']
    },
    minimumSkill:{
        type:String,
        required:[true, 'Minimum skill required'],
        enum:['beginner', 'intermediate', 'advanced'],
    },
    scholarshipAvailable:{
        type:Boolean,
        default:false,
    },
    createdAd:{
        type:Date,
        default:Date.now
    },
    bootcamp:{
        type:mongoose.Types.ObjectId,
        ref:'Bootcamp',
        required:[true, 'Please add a bootcamp']
    }
});

//Statis method to get average of course tuitions
courseSchema.statics.getAverageCost = async function(){
    
}

// call get average cost after save
courseSchema.pre('save', function(){

});

// call get average cost after save
courseSchema.pre('deleteOne', function(){

});


module.exports = mongoose.model('Course', courseSchema);