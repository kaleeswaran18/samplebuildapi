const express = require("express");
const router = express.Router();
const productcontrol = require('../Controllers/product');

// ⭐ Direct upload → no multer middleware
router.post('/create', productcontrol.create);
router.post('/projectsSchema', productcontrol.createAlprojectsSchema);
router.put('/updateprojectsSchema', productcontrol.updateprojectsSchema);
router.delete('/deleteprojectsSchema', productcontrol.deleteprojectsSchema);
router.get('/getprojectsSchema', productcontrol.getprojectsSchema);


router.post('/Foundercreate', productcontrol.Foundercreate);
router.put('/FounderupdateSchema', productcontrol.FounderupdateSchema);
router.delete('/FounderdeleteSchema', productcontrol.FounderdeleteSchema);
router.get('/FoundergetSchema', productcontrol.FoundergetSchema);


router.post('/servicecreate', productcontrol.servicecreate);
router.put('/updateservicecreateSchema', productcontrol.updateservicecreateSchema);
router.delete('/deleteservicesSchema', productcontrol.deleteservicesSchema);
router.get('/getserviceSchema', productcontrol.getserviceSchema);




router.post('/Leadershipcreate', productcontrol.Leadershipcreate);
router.put('/LeadershipupdateSchema', productcontrol.LeadershipupdateSchema);
router.delete('/LeadershipdeleteSchema', productcontrol.LeadershipdeleteSchema);
router.get('/LeadershipgetSchema', productcontrol.LeadershipgetSchema);

// 380468
router.post('/createTestimonials', productcontrol.createTestimonials);
router.get('/getTestimonials', productcontrol.getTestimonials);
router.put('/updateTestimonials', productcontrol.updateTestimonials);
router.delete('/deleteTestimonials', productcontrol.deleteTestimonials);  



// =====================================================
    // ⭐ Alprojects 
    // =====================================================
router.post('/createAlprojectsSchema', productcontrol.createAlprojectsSchema);
router.put('/updateAlprojectsSchema', productcontrol.updateAlprojectsSchema);
router.delete('/deleteAlprojectsSchema', productcontrol.deleteAlprojectsSchema);
router.get('/getAlprojectsSchema', productcontrol.getAlprojectsSchema);





router.get('/get', productcontrol.get);

  // =====================================================
    // ⭐ carrer 
    // =====================================================
router.post('/createcarrer', productcontrol.createcarrer);
router.put('/updatecarrer', productcontrol.updatecarrer);
router.delete('/deletecarrer', productcontrol.deletecarrer);
router.get('/getcarrer', productcontrol.getcarrer);
// =====================================================
    // ⭐ carrer 
    // =====================================================
router.get('/ViewProject', productcontrol.ViewProject);
// =====================================================
    // ⭐  sliderscreate
    // =====================================================
router.post('/sliderscreate', productcontrol.sliderscreate);
router.get('/slidersget', productcontrol.slidersget);
router.delete('/slidersdelete', productcontrol.slidersdelete);
router.put('/slidersupdate', productcontrol.slidersupdate);


router.put('/update', productcontrol.update);
// =====================================================
    // ⭐ createform 
    // =====================================================
router.post('/createform', productcontrol.createform);
router.get('/getform', productcontrol.getform);


router.delete('/deleted', productcontrol.deleted);

module.exports = router;
