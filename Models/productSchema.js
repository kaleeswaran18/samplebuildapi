const mongoose = require("mongoose");

// -------------------------
// PRODUCT SCHEMA
// -------------------------
const productSchema = new mongoose.Schema({
    Id: Number,
    Name: String,
    Price: Number,
    Description: String,
    Image: String
});
const Product = mongoose.model("product", productSchema);

// -------------------------
// PROJECT SCHEMA
// -------------------------
const projectSchema = new mongoose.Schema({
    name: String,
    bhk: String,
    location: String,
    image: String
});
const Project = mongoose.model("project", projectSchema);

// -------------------------
// COUNTERS SCHEMA
// -------------------------
const countersSchema = new mongoose.Schema({
    title: String,
    value: Number,
    suffix: String
});
const Counter = mongoose.model("counter", countersSchema);

// -------------------------
// ALL PROJECTS SCHEMA
// -------------------------
const allProjectsSchema = new mongoose.Schema({
    name: String,
    projectPlaceid: String,
    iscomplete: {
        type: Boolean,
        default: false
    },
    projectPlace: String,
    bhk: String,
    location: String,
    image: String
});
const AllProjects = mongoose.model("all_projects", allProjectsSchema);

// -------------------------
// SLIDER SCHEMA (images array)
// -------------------------
const sliderSchema = new mongoose.Schema({
    images: {
        type: [String],
        default: []
    }
});
const Slider = mongoose.model("slider", sliderSchema);

// -------------------------
// SLIDER SCHEMA (images array)
// -------------------------
const homemediaimageSchema = new mongoose.Schema({
    images:String
});
const Homemediaimage = mongoose.model("Homemediaimage", homemediaimageSchema);
  
const testimonials = new mongoose.Schema({
    name: String,
    location: String,
    project: String,
    rating:String,
    text:String,
    day:String
});
const Testimonials = mongoose.model("testimonials", testimonials);
// -------------------------
// CUSTOMER SCHEMA
// -------------------------
const customerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    message: String,
    day:String,
    time:String
});
const Customer = mongoose.model("customer", customerSchema);

// -------------------------
// CAREER SCHEMA
// -------------------------
const careerSchema = new mongoose.Schema({
    title: String,
    department: String,
    location: String,
    type: String
});
const Career = mongoose.model("career", careerSchema);

// -------------------------
// EXPORT MODELS
// -------------------------
module.exports = {
    Product,
    Project,
    Counter,
    AllProjects,
    Slider,
    Customer,
    Career,
    Homemediaimage,
    Testimonials
};
