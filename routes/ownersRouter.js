const express = require("express")
const router = express.Router()
const ownerModel = require("../models/owner")
// const isAdmin = require("../middlewares/isAdmin");

if (process.env.NODE_ENV === 'development') {
    router.post("/create", async function (req, res) {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.status(401).send("Owner Already exists cannot create new!")
        }

        try {
            let { fullname, email, password } = req.body;
            const createdOwner = await ownerModel.create({
                fullname,
                email,
                password,
            })
            res.send(createdOwner);
        } catch (error) {
            res.send(error.message)
        }
    })

}

router.get("/admin", async function (req, res) {
    if (process.env.NODE_ENV === 'development') {
        let success = req.flash("success");
        let error = req.flash("error");
        res.render("createProduct", { success, error });
    }else{
        return res.status(401).send("NODE_ENV not found ! You don't have permissions to this route.")
    }
})

// router.post("/createProduct", async function (req, res) {
//     req.flash("succes", "Product created succesfully.")
//     res.redirect("/admin");
// })
module.exports = router;