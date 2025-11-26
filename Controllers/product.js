const { Product, Project, AllProjects,Slider,Career,Customer,Founder,Homemediaimage,Testimonials,Leadership,Service,contact} = require('../Models/productSchema');

const cloudinary = require('../multer');
const moment = require("moment-timezone");
const productcontrol = () => {

    // =====================================================
    // ⭐ CREATE PRODUCT (Cloudinary Upload)
    // =====================================================
  const create = async (req, res) => {
  try {
    console.log(req.body, req.files?.file, "check");

    // ⭐ Check file exists
    if (!req.files || !req.files.file) {
      return res.status(400).json({ msg: "Image is required" });
    }

    const file = req.files.file;

    // ⭐ Upload image OR video automatically
    const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto", // <-- Handles image, video, pdf, etc.
      folder: "products/media", // Universal folder
    });

    console.log(uploaded, "uploaded");

    // ⭐ Create DB record
    const createdata = await Project.create({
      name: req.body.name,
      location: req.body.location,
      bhk: req.body.bhk,

      // Save file URL (image/video/pdf)
      image: uploaded.secure_url,

      // Save Cloudinary media type (image / video / raw)
      mediaType: uploaded.resource_type,
    });

    res.status(200).json({
      statuscode: 200,
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
    console.log(req.body, req.files?.file, "check");

    const id = req.body._id; 
    if (!id) {
      return res.status(400).json({ msg: "ID is required for update" });
    }

    // ⭐ Find existing project
    const oldData = await Project.findById(id);
    if (!oldData) {
      return res.status(404).json({ msg: "Project not found" });
    }

    let fileUrl = oldData.image;        // Keep old URL
    let fileType = oldData.mediaType;   // Keep old type

    // ⭐ If new file uploaded → process it
    if (req.files && req.files.file) {
      const file = req.files.file;

      const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: "auto",  // ⭐ Supports image + video
        folder: "products/media",
      });

      fileUrl = uploaded.secure_url;
      fileType = uploaded.resource_type;   // ⭐ image / video / raw
    }

    // ⭐ Update database
    const updated = await Project.findByIdAndUpdate(
      id,
      {
        name: req.body.name || oldData.name,
        location: req.body.location || oldData.location,
        bhk: req.body.bhk || oldData.bhk,

        image: fileUrl,
        mediaType: fileType,
      },
      { new: true }
    );

    res.status(200).json({
      statuscode: 200,
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
            
   const result = await Project.deleteOne({ _id: req.body._id });
            res.status(200).json({
                statuscode:200,
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
                statuscode:200,
                message: "get a data Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
const Foundercreate = async (req, res) => {
  try {
    console.log(req.body, req.files?.file, "check");

    if (!req.files || !req.files.file) {
      return res.status(400).json({ msg: "File is required" });
    }

    const file = req.files.file;

    // ⭐ Upload Image or Video Automatically
    const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto", // <-- supports image + video
      folder: "products/media",
    });

    console.log(uploaded, "uploaded");

    const createdata = await Founder.create({
      name: req.body.name,
      role: req.body.role,
      description: req.body.description,

      // ⭐ Store uploaded file URL
      image: uploaded.secure_url,

      // ⭐ Save file type (image / video)
      mediaType: uploaded.resource_type,
    });

    res.status(200).json({
      statuscode: 200,
      message: "Founder created successfully",
      data: createdata,
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Please Provide Valid Data!!!");
  }
};


const FounderupdateSchema = async (req, res) => {
  try {
    console.log(req.body, req.files?.file, "check");

    const id = req.body._id;
    if (!id) {
      return res.status(400).json({ msg: "ID is required for update" });
    }

    // ⭐ Find existing founder data
    const oldData = await Founder.findById(id);
    if (!oldData) {
      return res.status(404).json({ msg: "Founder not found" });
    }

    let fileUrl = oldData.image;       // keep old image/video
    let fileType = oldData.mediaType;  // keep old type

    // ⭐ If new file uploaded → update
    if (req.files && req.files.file) {
      const file = req.files.file;

      const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: "auto",   // ⭐ supports IMAGE + VIDEO
        folder: "products/media",
      });

      fileUrl = uploaded.secure_url;
      fileType = uploaded.resource_type; // ⭐ image / video
    }

    // ⭐ Update founder details
    const updated = await Founder.findByIdAndUpdate(
      id,
      {
        name: req.body.name || oldData.name,
        role: req.body.role || oldData.role,
        description: req.body.description || oldData.description,
        image: fileUrl,
        mediaType: fileType,
      },
      { new: true }
    );

    res.status(200).json({
      statuscode: 200,
      message: "Founder updated successfully",
      data: updated,
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Please Provide Valid Data!!!");
  }
};


     const FounderdeleteSchema = async (req, res) => {
        try {
            
   const result = await Founder.deleteOne({ _id: req.body._id });
            res.status(200).json({
                statuscode:200,
                message: "Project delete Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
     const FoundergetSchema = async (req, res) => {
        try {
           

            
            

            const createdata = await Founder.find({
               
            });

            res.status(200).json({
                statuscode:200,
                message: "get a data Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };

const Leadershipcreate = async (req, res) => {
  try {
    console.log(req.body, req.files?.file, "check");

    if (!req.files || !req.files.file) {
      return res.status(400).json({ msg: "File is required" });
    }

    const file = req.files.file;

    // ⭐ Upload image or video
    const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto", // supports both image + video
      folder: "products/media",
    });

    console.log(uploaded, "uploaded");

    const createdata = await Leadership.create({
      name: req.body.name,
      role: req.body.role,
      description: req.body.description,

      // ⭐ Store file URL
      image: uploaded.secure_url,

      // ⭐ Save file type (image/video)
      mediaType: uploaded.resource_type,
    });

    res.status(200).json({
      statuscode: 200,
      message: "Leadership member created successfully",
      data: createdata,
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Please Provide Valid Data!!!");
  }
};


const LeadershipupdateSchema = async (req, res) => {
  try {
    console.log(req.body, req.files?.file, "check");

    const id = req.body._id; // frontend must send this

    if (!id) {
      return res.status(400).json({ msg: "ID is required for update" });
    }

    // ⭐ Find old record
    const oldData = await Leadership.findById(id);

    if (!oldData) {
      return res.status(404).json({ msg: "Leadership member not found" });
    }

    let fileUrl = oldData.image;        // keep old URL
    let mediaType = oldData.mediaType;  // keep old media type

    // ⭐ If new file uploaded → upload to Cloudinary
    if (req.files && req.files.file) {
      const file = req.files.file;

      const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: "auto",       // supports video + image
        folder: "products/media",
      });

      fileUrl = uploaded.secure_url;
      mediaType = uploaded.resource_type;
    }

    // ⭐ Update the data
    const updated = await Leadership.findByIdAndUpdate(
      id,
      {
        name: req.body.name ?? oldData.name,
        role: req.body.role ?? oldData.role,
        description: req.body.description ?? oldData.description,

        // Updated file URL or old one
        image: fileUrl,

        // store image/video
        mediaType: mediaType,
      },
      { new: true }
    );

    res.status(200).json({
      statuscode: 200,
      message: "Leadership member updated successfully",
      data: updated,
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Please Provide Valid Data!!!");
  }
};


     const LeadershipdeleteSchema = async (req, res) => {
        try {
            
   const result = await Leadership.deleteOne({ _id: req.body._id });
            res.status(200).json({
                statuscode:200,
                message: "Project delete Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!",err);
        }
    };
     const LeadershipgetSchema = async (req, res) => {
        try {
           

            
            

            const createdata = await Leadership.find({
               
            });

            res.status(200).json({
                statuscode:200,
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
    console.log(req.body, req.files?.file, "check");

    if (!req.files || !req.files.file) {
      return res.status(400).json({ msg: "File is required" });
    }

    const file = req.files.file;

    // ⭐ Auto detect image or video
    const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",   // <-- supports IMAGE + VIDEO
      folder: "products/media",
    });

    console.log(uploaded, "uploaded");

    const createdata = await Homemediaimage.create({
      fileUrl: uploaded.secure_url,    // ⭐ File URL (img/video)
      mediaType: uploaded.resource_type,  // ⭐ "image" or "video"
    });

    res.status(200).json({
      statuscode: 200,
      message: "Media uploaded successfully",
      data: createdata,
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Please Provide Valid Data!!!");
  }
};


 
     const deletehomeimage = async (req, res) => {
        try {
            
   const result = await Homemediaimage.deleteOne({ _id: req.body._id });
            res.status(200).json({
                statuscode:200,
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
                statuscode:200,
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
                statuscode:200,
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
                statuscode:200,
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
                statuscode:200,
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
                statuscode:200,
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
                statuscode:200,
                message: "Update Testimonials Successfully",
                
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!",err);
        }
    };
     const deleteTestimonials = async (req, res) => {
        try {
           const result = await Testimonials.deleteOne({ _id: req.body._id });
           

            res.status(200).json({
                statuscode:200,
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
                statuscode:200,
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
                statuscode:200,
                message: "Updatecarrer post Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
      const updatecontact = async (req, res) => {
        try {
   
          console.log(req.body.address,' req.body.address')
            const updateData = {
                  address: req.body.address,
                    phone: req.body.phone,
                email: req.body.email,
                 businessHours: req.body.businessHours,
            };

         

            const updated = await contact.findByIdAndUpdate(
                req.body._id,
                updateData,
                { new: true }
            );
            res.status(200).json({
                statuscode:200,
                message: "Updatecarrer post Successfully",
              
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!",err);
        }
    };
   
      const createcontact = async (req, res) => {
        try {
           
            const createdata = await contact.create({
                
                address: req.body.address,
                    phone: req.body.phone,
                email: req.body.email,
                 businessHours: req.body.businessHours,
                // ⭐ Cloudinary URL
            });

            res.status(200).json({
                statuscode:200,
                message: "Product created Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
     const deletecarrer = async (req, res) => {
        try {
           const result = await Career.deleteOne({ _id: req.body._id });
           

            res.status(200).json({
                statuscode:200,
                message: "Carrer post delete Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
       const deletecontact = async (req, res) => {
        try {
           const result = await contact.deleteOne({ _id: req.body._id });
           

            res.status(200).json({
                statuscode:200,
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
                statuscode:200,
                message: "get all carrerpost Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
    
      const getcontact = async (req, res) => {
        try {
           
            const createdata = await contact.find({});

            res.status(200).json({
                statuscode:200,
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
    console.log(req.body, req.files?.file, "check-slider");

    if (!req.files || !req.files.file) {
      return res.status(400).json({ msg: "File is required" });
    }

    const file = req.files.file;

    // ⭐ Upload (auto detect: image/video)
    const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",     // <-- IMPORTANT (supports image + video)
      folder: "slider/media",    // you can keep images folder if you want
    });

    // ⭐ Check existing slider (only one document exists always)
    let sliderDoc = await Slider.findOne();

    if (!sliderDoc) {
      // Create first doc
      sliderDoc = await Slider.create({
        images: [
          {
            url: uploaded.secure_url,
            type: uploaded.resource_type,  // image or video
          }
        ]
      });
    } else {
      // Push new file
      sliderDoc.images.push({
        url: uploaded.secure_url,
        type: uploaded.resource_type,
      });

      await sliderDoc.save();
    }

    res.status(200).json({
      statuscode: 200,
      message: "Slider updated successfully",
      data: sliderDoc,
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Please Provide Valid Data!!!");
  }
};

     const slidersdelete = async (req, res) => {
        try {
    
const { _id, url } = req.body;
    if (!_id || !url) {
      return res.status(400).json({ msg: "Image is required" });
    }

    const updated = await Slider.findByIdAndUpdate(
      _id,
      { $pull: { images: url } }, // remove only that image
      { new: true }
    );

    res.status(200).json({
        statuscode:200,
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
        statuscode:200,
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
        statuscode:200,
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
    console.log(req.body, req.files?.file, "incoming-create");

    // ⭐ Validate file
    if (!req.files || !req.files.file) {
      return res.status(400).json({ statuscode: 400, msg: "File is required" });
    }

    const file = req.files.file;

    if (!file.tempFilePath) {
      return res.status(400).json({ statuscode: 400, msg: "Invalid file upload" });
    }

    // ⭐ Validate projectPlace
    if (!req.body.projectPlace) {
      return res.status(400).json({ statuscode: 400, msg: "projectPlace is required" });
    }

    const project = await Project.findOne({ name: req.body.projectPlace });

    if (!project) {
      return res.status(404).json({ statuscode: 404, msg: "Project Place not found" });
    }

    // ⭐ Upload file (image/video)
    const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",     // image OR video
      folder: "products/media",
    });

    console.log(uploaded, "uploaded");

    // ⭐ Create the project entry
    const createdata = await AllProjects.create({
      projectPlace: req.body.projectPlace,
      projectPlaceid: project._id,

      name: req.body.name,
      location: req.body.location,
      bhk: req.body.bhk,

      image: uploaded.secure_url,     // URL
      mediaType: uploaded.resource_type,  // "image" / "video"
    });

    res.status(200).json({
      statuscode: 200,
      message: "Project created Successfully",
      data: createdata,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      statuscode: 500,
      msg: "Please Provide Valid Data!!!",
      error: err.message,
    });
  }
};



 const updateAlprojectsSchema = async (req, res) => {
  try {
    console.log(req.body, req.files?.file, "incoming-update");

    const id = req.body._id;

    // ⭐ Validate ID
    if (!id) {
      return res.status(400).json({ statuscode: 400, msg: "ID is required for update" });
    }

    // ⭐ Find old data
    const oldData = await AllProjects.findById(id);

    if (!oldData) {
      return res.status(404).json({ statuscode: 404, msg: "Project not found" });
    }

    // ================================
    // HANDLE PROJECT PLACE CHANGE
    // ================================
    let projectPlaceId = oldData.projectPlaceid;
    let projectPlace = oldData.projectPlace;

    if (req.body.projectPlace) {
      const project = await Project.findOne({ name: req.body.projectPlace });

      if (!project) {
        return res.status(404).json({ statuscode: 404, msg: "Project Place not found" });
      }

      projectPlaceId = project._id;
      projectPlace = req.body.projectPlace;
    }

    // ================================
    // HANDLE IMAGE / VIDEO UPDATE
    // ================================
    let fileUrl = oldData.image;
    let mediaType = oldData.mediaType;

    if (req.files && req.files.file) {
      const file = req.files.file;

      const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: "auto",  // <-- supports image / video
        folder: "products/media",
      });

      fileUrl = uploaded.secure_url;
      mediaType = uploaded.resource_type; // "image" or "video"
    }

    // ================================
    // UPDATE DOCUMENT
    // ================================
    const updated = await AllProjects.findByIdAndUpdate(
      id,
      {
        projectPlace,
        projectPlaceid: projectPlaceId,

        name: req.body.name || oldData.name,
        location: req.body.location || oldData.location,
        bhk: req.body.bhk || oldData.bhk,

        image: fileUrl,
        mediaType: mediaType,
      },
      { new: true }
    );

    return res.status(200).json({
      statuscode: 200,
      message: "Project updated successfully",
      data: updated,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statuscode: 500,
      msg: "Please Provide Valid Data!!!",
      error: err.message
    });
  }
};


     const deleteAlprojectsSchema = async (req, res) => {
        try {
            
   const result = await AllProjects.deleteOne({ _id: req.body._id });
            res.status(200).json({
                statuscode:200,
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
                statuscode:200,
                message: "get a data Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };


const servicecreate = async (req, res) => {
  try {
    console.log(req.body, req.files?.file, "incoming-service");

    // ⭐ Validate file
    if (!req.files || !req.files.file) {
      return res.status(400).json({
        statuscode: 400,
        msg: "File (image/video) is required",
      });
    }

    const file = req.files.file;

    if (!file.tempFilePath) {
      return res.status(400).json({
        statuscode: 400,
        msg: "Invalid file upload",
      });
    }

    // ⭐ Upload file (image/video auto detect)
    const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto", // image or video
      folder: "products/services",
    });

    console.log(uploaded, "uploaded");

    // ⭐ Create service entry
    const createdata = await Service.create({
      name: req.body.name,
      role: req.body.role,

      // store file URL
      image: uploaded.secure_url,

      // store media type → image / video
      mediaType: uploaded.resource_type,
    });

    res.status(200).json({
      statuscode: 200,
      message: "Service created successfully",
      data: createdata,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      statuscode: 500,
      msg: "Please Provide Valid Data!!!",
      error: err.message,
    });
  }
};


const updateservicecreateSchema = async (req, res) => {
  try {
    console.log(req.body, req.files?.file, "service-update");

    const id = req.body._id;

    if (!id) {
      return res.status(400).json({ msg: "ID is required for update" });
    }

    // ⭐ Find existing service
    const oldData = await Service.findById(id);

    if (!oldData) {
      return res.status(404).json({ msg: "Service not found" });
    }

    let fileUrl = oldData.image;      // keep old file
    let mediaType = oldData.mediaType; // keep old media type

    // ⭐ If new file uploaded → upload (image/video)
    if (req.files && req.files.file) {
      const file = req.files.file;

      const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: "auto",       // auto detect image / video
        folder: "products/services", // store properly
      });

      fileUrl = uploaded.secure_url;
      mediaType = uploaded.resource_type; // image / video
    }

    // ⭐ Update data
    const updated = await Service.findByIdAndUpdate(
      id,
      {
        name: req.body.name || oldData.name,
        role: req.body.role || oldData.role,

        image: fileUrl,
        mediaType: mediaType,
      },
      { new: true }
    );

    res.status(200).json({
      statuscode: 200,
      message: "Service updated successfully",
      data: updated,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      statuscode: 500,
      msg: "Update failed",
      error: err.message,
    });
  }
};


     const deleteservicesSchema = async (req, res) => {
        try {
            
   const result = await Service.deleteOne({ _id: req.body._id });
            res.status(200).json({
                 statuscode:200,
                message: "Project delete Successfully",
                data: createdata,
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Please Provide Valid Data!!!");
        }
    };
     const getserviceSchema = async (req, res) => {
        try {
           

            
            

            const createdata = await Service.find({
               
            });

            res.status(200).json({
                 statuscode:200,
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
                 statuscode:200,
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
               statuscode:200,
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
            if (req.files && req.files.file) {
                const file = req.files.file;

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
                 statuscode:200,
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
            const result = await Product.deleteOne({ _id: req.body._id });

            res.status(200).send({
                 statuscode:200,
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

homeimage,
createTestimonials,
getTestimonials,
updateTestimonials,
deleteTestimonials,
slidersupdate,
FoundergetSchema,
FounderdeleteSchema,
FounderupdateSchema,
Foundercreate,
Leadershipcreate,
LeadershipupdateSchema,
LeadershipdeleteSchema,
LeadershipgetSchema,
servicecreate,
updateservicecreateSchema,
deleteservicesSchema,
getserviceSchema,
updatecontact,
createcontact,
getcontact,
deletecontact

    };
};

module.exports = productcontrol();
