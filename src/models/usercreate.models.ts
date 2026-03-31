import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";

export const userCreate = mongoose.model('users', new mongoose.Schema({
    name:{
        type:String,
        require:true,       
    },
    age:{
        type:Number,
        require:true, 
        // min:[18, "Age must be at least 18"], 
        // custom validation
        validate:{
            validator:function(value:number){
                return value  >= 18;
            },
            message :"Age must be at least 18"
        }
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    lastmodifiedAt:{
        type:Date,
        default:Date.now
    },
}).plugin(mongoosepaginate));




// validation rules and examples
// new mongoose.Schema({
//      name:{
//         type:[String , "Custom error message for name field"],
//         required:[true, "Name is required"],
//         trime:true,
        
//      },
//         age:{
//             type:[Number, "age must be a number"],

//         },
//   eggs: {
//     type: Number,
//     min: [6, "Too few eggs"],
//     max: [12, "Too many eggs"],
//     required: [true, "Why no eggs?"],
//   },

//   drink: {
//     type: String,
//     enum: {
//       values: ["Coffee", "Tea", "Water"],
//       message: "Invalid drink option",
//     },
//   },

//   email: {
//     type: String,
//     match: [/^\S+@\S+\.\S+$/, "Invalid email"],
//     required: true,
//     unique: true,
//   },
//   fatherName: {
//     type: String,
//     minlength: [3, "Too short"],
//     maxlength: [20, "Too long"],
//     trim: true,
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   item:{
//     type:Number,
//     validate:{
//         validator:function(value:number){
//             return value > 15;
//         },
//         message:"Value must be greater than 15"
//     }
//   }

// })


// 🧠 1. Basic Custom Validator (object syntax)


// age: {
//   type: Number,
//   validate: {
//     validator: function (v) {
//       return v >= 18;
//     },
//     message: "Age must be 18+",
//   },
// }
// ⚡ 2. Inline function validator (shortcut 🔥)

// 👉 Short form:

// age: {
//   type: Number,
//   validate: v => v >= 18
// }

// 👉 Custom message bhi de sakta:

// validate: {
//   validator: v => v >= 18,
//   message: "Age must be 18+"
// }
// 🧩 3. Multiple validators (array form 🔥🔥)

// 👉 Ek field pe multiple rules:

// age: {
//   type: Number,
//   validate: [
//     {
//       validator: v => v >= 18,
//       message: "Too young"
//     },
//     {
//       validator: v => v <= 60,
//       message: "Too old"
//     }
//   ]
// }
// 🚀 4. Async validator (IMPORTANT 🔥)

// 👉 Jab DB check ya API call ho:

// email: {
//   type: String,
//   validate: {
//     validator: async function (v) {
//       const user = await mongoose.models.User.findOne({ email: v });
//       return !user; // true = valid
//     },
//     message: "Email already exists"
//   }
// }
// 🧠 5. Schema method based validation

// 👉 Function reusable bana sakte ho:

// function validateAge(v) {
//   return v >= 18;
// }

// age: {
//   type: Number,
//   validate: {
//     validator: validateAge,
//     message: "Invalid age"
//   }
// }

// ⚡ 6. Conditional validation (dynamic 🔥)
// drink: {
//   type: String,
//   validate: {
//     validator: function (v) {
//       if (this.eggs > 10) {
//         return v === "Water";
//       }
//       return true;
//     },
//     message: "If eggs > 10, drink must be Water"
//   }
//}