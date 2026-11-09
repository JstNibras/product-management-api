import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: [],
    })
})

export default router;