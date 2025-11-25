const { Product, Project, AllProjects,Slider,Career,Customer,Homemediaimage,Testimonials} = require('../Models/productSchema');

const cloudinary = require('../multer');
const moment = require("moment-timezone");
const productcontrol = () => {

    // =====================================================
    // ⭐ CREATE PRODUCT (Cloudinary Upload)
    // =====================================================
    const create = async (req, res) => {
        try {
            console.log(req.body,req.files.Image,"check")
            if (!req.files || !req.files.Image) {
                return res.status(400).json({ msg: "Image is required" });
            }

            const file = req.files.Image;

            // ⭐ Upload to Cloudinary
            const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "products/images",
            });
            console.log(uploaded,"uploaded")
            const createdata = await Project.create({
                
                name: req.body.name,
                location: req.body.location,
                bhk: req.body.bhk,
                image: uploaded.secure_url,  // ⭐ Cloudinary URL
            });

            res.status(200).json({
                message: "Product created Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };

     const updateprojectsSchema = async (req, res) => {
  try {
    console.log(req.body, req.files?.image, "check");

    const id = req.body._id; // ⭐ send this from frontend

    if (!id) {
      return res.status(400).json({ msg: "ID is required for update" });
    }
   const findall=await Project.find({_id:id})
   console.log(findall,"hellocheck")
    // ⭐ Find existing project
    const oldData = await Project.findById(id);

    if (!oldData) {
      return res.status(404).json({ msg: "Project not found" });
    }

    let imageUrl = oldData.image; // default old image

    // ⭐ If new image uploaded → upload to Cloudinary
    if (req.files && req.files.image) {
      const file = req.files.image;

      const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "products/images",
      });

      imageUrl = uploaded.secure_url; // replace old image
    }

// _id
// 691eb4a35f3bb0c2d72e0625
// name
// garden38
// bhk
// helloworld8
// location
// thirupurakundam89
// image
// https://res.cloudinary.com/dbrymrvqu/image/upload/v1763620002/products/images/myhwhtrchcjhijhyi3qw.jpg

    // ⭐ Update data
    const updated = await Project.findByIdAndUpdate(
      id,
      {
        
        name: req.body.name || oldData.name,
        location: req.body.location || oldData.location,
        bhk: req.body.bhk || oldData.bhk,
        image: imageUrl, // ⭐ updated or old image
      },
      { new: true }
    );

    res.status(200).json({
      message: "Project updated successfully",
      data: updated,
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Please Provide Valid Data!!!");
  }
};

     const deleteprojectsSchema = async (req, res) => {
        try {
            
   const result = await Project.deleteOne({ _id: req.params._id });
            res.status(200).json({
                message: "Project delete Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
     const getprojectsSchema = async (req, res) => {
        try {
           

            
            

            const createdata = await Project.find({
               
            });

            res.status(200).json({
                message: "get a data Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };





    const homeimage = async (req, res) => {
        try {
            console.log(req.body,req.files.Image,"check")
            if (!req.files || !req.files.Image) {
                return res.status(400).json({ msg: "Image is required" });
            }

            const file = req.files.Image;

            // ⭐ Upload to Cloudinary
            const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "products/images",
            });
            console.log(uploaded,"uploaded")
            const createdata = await Homemediaimage.create({
                
                
                images: uploaded.secure_url,  // ⭐ Cloudinary URL
            });

            res.status(200).json({
                message: "Product created Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };

     const updateHomeimage = async (req, res) => {
  try {
    console.log(req.body, req.files?.Image, "check");

    const id = req.body._id; // ⭐ send this from frontend

    if (!id) {
      return res.status(400).json({ msg: "ID is required for update" });
    }

    // ⭐ Find existing project
    const oldData = await Project.findById(id);

    if (!oldData) {
      return res.status(404).json({ msg: "Project not found" });
    }

    let imageUrl = oldData.image; // default old image

    // ⭐ If new image uploaded → upload to Cloudinary
    if (req.files && req.files.Image) {
      const file = req.files.Image;

      const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "products/images",
      });

      imageUrl = uploaded.secure_url; // replace old image
    }



    // ⭐ Update data
    const updated = await AllProjects.findByIdAndUpdate(
      id,
      {
        
       
        image: imageUrl, // ⭐ updated or old image
      },
      { new: true }
    );

    res.status(200).json({
      message: "Project updated successfully",
      data: updated,
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Please Provide Valid Data!!!");
  }
};

     const deletehomeimage = async (req, res) => {
        try {
            
   const result = await Homemediaimage.deleteOne({ _id: req.params._id });
            res.status(200).json({
                message: "Project delete Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
     const gethomeimage = async (req, res) => {
        try {
           

            
            

            const createdata = await Homemediaimage.find({
               
            });

            res.status(200).json({
                message: "get a data Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };


     // =====================================================
    // ⭐ createform 
    // =====================================================
    const createform = async (req, res) => {
        try {
           
            const createdata = await Customer.create({
                
                name: req.body.name,
            phone: req.body.phone,
            message: req.body.message,

            // 👉 Store Day & Time Separately
            day: moment().tz("Asia/Kolkata").format("DD-MM-YYYY"), // 20-11-2025
            time: moment().tz("Asia/Kolkata").format("hh:mm A"),   // 07:52 AM
            });

            res.status(200).json({
                message: "Create form succssfully created Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!",err);
        }
    };

 const getform = async (req, res) => {
        try {
           
            const createdata = await Customer.find({});

            res.status(200).json({
                message: "Get all form data Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };

    // =====================================================
    // ⭐ Testimonials 
    // =====================================================
    const createTestimonials = async (req, res) => {
        try {
           
            const createdata = await Testimonials.create({
                
                name: req.body.name,
            location: req.body.location,
            project: req.body.project,
rating: req.body.rating,
text: req.body.text,
            // 👉 Store Day & Time Separately
            day: moment().tz("Asia/Kolkata").format("DD-MM-YYYY"), // 20-11-2025
           
            });

            res.status(200).json({
                message: "Create form succssfully created Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!",err);
        }
    };

 const getTestimonials = async (req, res) => {
        try {
           
            const createdata = await Testimonials.find({});

            res.status(200).json({
                message: "Get all form data Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
 const updateTestimonials = async (req, res) => {
        try {
           
          
            const updateData = {
                    name: req.body.name,
            location: req.body.location,
            project: req.body.project,
rating: req.body.rating,
text: req.body.text,
            // 👉 Store Day & Time Separately
            day: moment().tz("Asia/Kolkata").format("DD-MM-YYYY"), // 20-11-2025
            };

         

            const updated = await Testimonials.findByIdAndUpdate(
                req.body._id,
                updateData,
                { new: true }
            );
            res.status(200).json({
                message: "Update Testimonials Successfully",
                
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!",err);
        }
    };
     const deleteTestimonials = async (req, res) => {
        try {
           const result = await Testimonials.deleteOne({ _id: req.params._id });
           

            res.status(200).json({
                message: "testimonials  delete Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };

    
      // =====================================================
    // ⭐ createcarrer 
    // =====================================================
     const createcarrer = async (req, res) => {
        try {
           
            const createdata = await Career.create({
                
                title: req.body.title,
                    department: req.body.department,
                location: req.body.location,
                 type: req.body.type,
                // ⭐ Cloudinary URL
            });

            res.status(200).json({
                message: "Product created Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
     const updatecarrer = async (req, res) => {
        try {
           
          
            const updateData = {
                  title: req.body.title,
                    department: req.body.department,
                location: req.body.location,
                 type: req.body.type,
            };

         

            const updated = await Career.findByIdAndUpdate(
                req.body._id,
                updateData,
                { new: true }
            );
            res.status(200).json({
                message: "Updatecarrer post Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
     const deletecarrer = async (req, res) => {
        try {
           const result = await Career.deleteOne({ _id: req.params._id });
           

            res.status(200).json({
                message: "Carrer post delete Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
      const getcarrer = async (req, res) => {
        try {
           
            const createdata = await Career.find({});

            res.status(200).json({
                message: "get all carrerpost Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
    
    // =====================================================
    // ⭐ sliderscreate 
    // =====================================================
     const sliderscreate = async (req, res) => {
        try {
    console.log(req.body, req.files.Image, "check");

    if (!req.files || !req.files.Image) {
      return res.status(400).json({ msg: "Image is required" });
    }

    const file = req.files.Image;

    // ⭐ Upload to Cloudinary
    const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "slider/images",
    });

    // Find existing slider document
    const sliderData = await Slider.find();
   console.log(sliderData,"sliderData")
    let updatedSlider;

    if (sliderData.length === 0) {
      // ⭐ Create first slider document
      updatedSlider = await Slider.create({
        images: [uploaded.secure_url],
      });
    } else {
      // ⭐ Push new image
      updatedSlider = await Slider.findByIdAndUpdate(
        sliderData[0]._id,
        { $push: { images: uploaded.secure_url } },
        { new: true }
      );
    }

    // Fetch final updated slider
    const finalSlider = await Slider.findOne();

    res.status(200).json({
      message: "Slider updated successfully",
      data: finalSlider,
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Please Provide Valid Data!!!");
  }
};
     const slidersdelete = async (req, res) => {
        try {
    
const { _id, imageUrl } = req.body;
    if (!_id || !imageUrl) {
      return res.status(400).json({ msg: "Image is required" });
    }

    const updated = await Slider.findByIdAndUpdate(
      id,
      { $pull: { images: imageUrl } }, // remove only that image
      { new: true }
    );

    res.status(200).json({
      message: "Image removed successfully",
      data: updated,
    });

    

  } catch (err) {
    console.log(err);
    res.status(500).send("Please Provide Valid Data!!!");
  }
};
const slidersupdate = async (req, res) => {
  try {
    const { _id, oldImageUrl } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Slider ID is required" });
    }

    const slider = await Slider.findById(_id);
    if (!slider) {
      return res.status(404).json({ message: "Slider not found" });
    }

    // --------------------------------------
    // 1️⃣ REMOVE IMAGE (if requested)
    // --------------------------------------
    if (oldImageUrl) {
      slider.images = slider.images.filter((img) => img !== oldImageUrl);
    }

    // --------------------------------------
    // 2️⃣ ADD / REPLACE IMAGE (if uploaded)
    // --------------------------------------
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "slider/images",
      });

      slider.images.push(uploaded.secure_url);
    }

    // --------------------------------------
    // 3️⃣ SAVE UPDATED DOCUMENT
    // --------------------------------------
    const updatedSlider = await slider.save();

    res.status(200).json({
      message: "Slider updated successfully",
      data: updatedSlider,
    });

  } catch (err) {
    console.log("Slider update error:", err);
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

   
     const slidersget = async (req, res) => {
        try {
    
     const sliderData = await Slider.find();
    res.status(200).json({
      message: "Slider updated successfully",
      data: sliderData,
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Please Provide Valid Data!!!");
  }
};
// =====================================================
    // ⭐ createAlprojectsSchema 
    // =====================================================
     const createAlprojectsSchema = async (req, res) => {
        try {
            console.log(req.body,req.files.Image,"check")
            if (!req.files || !req.files.Image) {
                return res.status(400).json({ msg: "Image is required" });
            }

            const file = req.files.Image;

            // ⭐ Upload to Cloudinary
            const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "products/images",
            });
            console.log(uploaded,"uploaded")
            const projectname=await Project.find({name:req.body.projectPlace})

            const createdata = await AllProjects.create({
                projectPlace:req.body.projectPlace,
                projectPlaceid:projectname[0]._id,
                name: req.body.name,
                location: req.body.location,
                bhk: req.body.bhk,
                image: uploaded.secure_url,  // ⭐ Cloudinary URL
            });

            res.status(200).json({
                message: "Product created Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };

 const updateAlprojectsSchema = async (req, res) => {
  try {
    console.log(req.body, req.files?.image, "check");

    const id = req.body._id; // ⭐ send this from frontend

    if (!id) {
      return res.status(400).json({ msg: "ID is required for update" });
    }

    // ⭐ Find existing project
    const oldData = await AllProjects.findById(id);

    if (!oldData) {
      return res.status(404).json({ msg: "Project not found" });
    }

    let imageUrl = oldData.image; // default old image

    // ⭐ If new image uploaded → upload to Cloudinary
    if (req.files && req.files.image) {
      const file = req.files.image;

      const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "products/images",
      });

      imageUrl = uploaded.secure_url; // replace old image
    }

    // ⭐ Get project ID from projectPlace
    const projectname = await Project.findOne({
      name: req.body.projectPlace,
    });

    // ⭐ Update data
    const updated = await AllProjects.findByIdAndUpdate(
      id,
      {
        projectPlace: req.body.projectPlace || oldData.projectPlace,
        projectPlaceid: projectname ? projectname._id : oldData.projectPlaceid,
        name: req.body.name || oldData.name,
        location: req.body.location || oldData.location,
        bhk: req.body.bhk || oldData.bhk,
        image: imageUrl, // ⭐ updated or old image
      },
      { new: true }
    );

    res.status(200).json({
      message: "Project updated successfully",
      data: updated,
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Please Provide Valid Data!!!");
  }
};

     const deleteAlprojectsSchema = async (req, res) => {
        try {
            
   const result = await AllProjects.deleteOne({ _id: req.params._id });
            res.status(200).json({
                message: "Project delete Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
     const getAlprojectsSchema = async (req, res) => {
        try {
           

            
            

            const createdata = await AllProjects.find({
               
            });

            res.status(200).json({
                message: "get a data Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };





    // =====================================================
    // ⭐ ViewProject
    // =====================================================
   const ViewProject = async (req, res) => {
        try {
            
            const projectname=await AlprojectsSchema.find({projectPlaceid:req.body.projectPlaceid})

           

            res.status(200).json({
                message: "Product created Successfully",
                data: projectname,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };

    // =====================================================
    // ⭐ GET ALL PRODUCTS
    // =====================================================
    const get = async (req, res) => {
        try {
            const findData = await product.find();
            res.status(200).send({
                data: findData,
                message: "Got Products Successfully!"
            });
        } catch (err) {
            console.log("Error fetching products");
        }
    };


    // =====================================================
    // ⭐ UPDATE PRODUCT (with or without new image)
    // =====================================================
    const update = async (req, res) => {
        try {
            let newImageUrl = null;

            // If new image uploaded
            if (req.files && req.files.Image) {
                const file = req.files.Image;

                // Upload to Cloudinary
                const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "products/images",
                });

                newImageUrl = uploaded.secure_url;
            }

            // Update data object
            const updateData = {
                Id: req.body.Id,
                Name: req.body.Name,
                Price: req.body.Price,
                Description: req.body.Description,
            };

            if (newImageUrl) {
                updateData.Image = newImageUrl;
            }

            const updated = await product.findByIdAndUpdate(
                req.body.uID,
                updateData,
                { new: true }
            );

            res.status(200).json({
                message: "Product Updated Successfully!",
                data: updated,
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Update failed" });
        }
    };


    // =====================================================
    // ⭐ DELETE PRODUCT
    // =====================================================
    const deleted = async (req, res) => {
        try {
            const result = await Product.deleteOne({ _id: req.params._id });

            res.status(200).send({
                data: result,
                message: "Product Deleted Successfully!"
            });

        } catch (err) {
            console.log("Something went wrong!!!");
        }
    };


    return {
        create,
        get,
        update,
        deleted,
        createAlprojectsSchema,
        ViewProject,
        sliderscreate,
        createform,
        createcarrer,
        updatecarrer,
        deletecarrer,
        getcarrer,
        getform,
        
        slidersdelete,
        slidersget,
        updateAlprojectsSchema,
        deleteAlprojectsSchema,
        getAlprojectsSchema,
          updateprojectsSchema,
        deleteprojectsSchema,
        getprojectsSchema,
        gethomeimage,
deletehomeimage,
updateHomeimage,
homeimage,
createTestimonials,
getTestimonials,
updateTestimonials,
deleteTestimonials,
slidersupdate
    };
};

module.exports = productcontrol();
