const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const Product = require("../models/Product");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/recommend", async (req, res) => {
  try {
    const { occasion, budget, color, gender, season, style, size, fabric } = req.body;

    const products = await Product.find();
    const productList = products.map(p =>
      `${p.name} - Rs.${p.price} - ${p.category}`
    ).join("\n");

    const prompt = `You are a fashion stylist. A customer wants outfit recommendations.
Customer preferences:
- Gender: ${gender}
- Occasion: ${occasion}
- Season: ${season}
- Style: ${style}
- Size: ${size}
- Fabric: ${fabric}
- Budget: Rs.${budget}
- Color preference: ${color}

Available products:
${productList}

Recommend 2-3 products from the list that best match the customer's needs.
Respond in this exact format:
PRODUCT: [exact product name]
REASON: [one line reason]

Only recommend products from the list above.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    const aiResponse = completion.choices[0].message.content;

    const recommended = products.filter(p =>
      aiResponse.includes(p.name)
    );

    res.json({
      message: aiResponse,
      products: recommended
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;