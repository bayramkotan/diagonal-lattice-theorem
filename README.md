<div align="center">

# DIAGONAL LATTICE THEOREM

### Köşegen Teoremi

<img src="assets/Istanbul_Universitesi.png" alt="Istanbul University" width="120">

**Istanbul University - 2009**

---

## 🌐 [LIVE DEMO - HERE](https://bayramkotan.github.io/diagonal-lattice-theorem/)

> 🔗 **https://bayramkotan.github.io/diagonal-lattice-theorem/**

---

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

### ✨ An interactive math simulation that visualizes how many unit squares a rectangle's diagonal passes through ✨

<br>

| 📐 **Formula** | 🔢 **GCD** | 🎯 **Result** |
|:---:|:---:|:---:|
| m + n − gcd(m,n) | Euclidean Algorithm | Number of crossed squares |

---

</div>

<br>

## 🎯 About

> **"The number of unit squares a diagonal of an m × n rectangle passes through is m + n − gcd(m, n)."**
>
> — *Diagonal Lattice Theorem*

This project is an interactive visualization of the **Diagonal Lattice Theorem**, a classic result in combinatorial geometry. Originally developed in **2009 at Istanbul University** using Visual Basic 6.0, it has now been rebuilt with modern web technologies.

**The Core Question:** When you draw a diagonal from one corner of a rectangle to the opposite corner, how many unit squares does it pass through?

<br>

## 🚀 Features

<table>
<tr>
<td width="50%">

### 🎮 Interactive Simulation
- ⚡ Real-time Canvas rendering
- 🎯 Highlighted crossed squares
- 🔄 Slider and numeric input controls
- 📊 Instant calculation results

</td>
<td width="50%">

### 📐 Math Visualization
- 🔵 GCD intersection point markers
- 🎬 Step-by-step animation mode
- 📏 Support for dimensions 1–100
- 💡 Detailed formula explanation

</td>
</tr>
</table>

<br>

## 📐 The Theorem

<div align="center">

### Diagonal Lattice Theorem

In an **m × n** rectangular grid, the number of unit squares the diagonal passes through is:

<br>

### `f(m, n) = m + n − gcd(m, n)`

<br>

| Symbol | Description |
|:------:|:----------:|
| **m** | Height of the rectangle (number of rows) |
| **n** | Width of the rectangle (number of columns) |
| **gcd(m,n)** | Greatest Common Divisor of m and n |

</div>

<br>

### 🧠 Why Does This Formula Work?

As the diagonal travels from the top-left corner to the bottom-right corner:

1. **Horizontal grid lines:** The diagonal crosses exactly **m** horizontal lines (excluding the top edge, including the bottom).
2. **Vertical grid lines:** The diagonal crosses exactly **n** vertical lines (excluding the left edge, including the right).
3. **Lattice points:** At certain interior lattice points, the diagonal crosses both a horizontal and a vertical line simultaneously. This happens **gcd(m, n) − 1** times at interior points (or **gcd(m, n)** times including the starting point).
4. Each line crossing means entering a new square, but at lattice points two crossings happen at once, so we subtract the overlap.

Result: **m + n − gcd(m, n)**

<br>

### 📊 Example Calculations

<div align="center">

| m × n | m + n | gcd(m,n) | Result |
|:-----:|:-----:|:--------:|:-----:|
| 3 × 4 | 7 | 1 | **6** |
| 5 × 7 | 12 | 1 | **11** |
| 6 × 6 | 12 | 6 | **6** |
| 8 × 12 | 20 | 4 | **16** |
| 10 × 15 | 25 | 5 | **20** |

</div>

> 💡 **Tip:** If m and n are coprime (gcd = 1), the diagonal passes through **m + n − 1** squares and never hits an interior lattice point.

> 💡 **Special Case:** If m = n (a square), the diagonal passes through exactly **n** squares (the squares along the main diagonal).

<br>

## 🖥️ Installation

### Requirements

- [Node.js](https://nodejs.org/) v18+
- npm or yarn

### Local Development

```bash
# 1️⃣ Clone the repository
git clone https://github.com/bayramkotan/diagonal-lattice-theorem.git

# 2️⃣ Navigate to the web directory
cd diagonal-lattice-theorem/web

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser 🎉

### Production Build

```bash
npm run build
npm run preview
```

<br>

## 📖 Usage Guide

<div align="center">

| Step | Action | Description |
|:---:|:---:|:---:|
| 1️⃣ | **Height** | Set via slider or type a number (1–100) |
| 2️⃣ | **Width** | Set via slider or type a number (1–100) |
| 3️⃣ | **Observe** | Orange squares show where the diagonal passes |
| 4️⃣ | **Animate** | Press ▶ to watch the diagonal trace step by step |

</div>

### 💡 Tips

- 🔵 Blue dots mark GCD intersection points on the diagonal
- 🟠 Orange squares indicate cells the diagonal passes through
- 🖱️ Hover over cells for interactive highlighting
- ⚡ Use Quick Presets to try common examples instantly

<br>

## 🛠️ Technologies

<div align="center">

| | Technology | Usage |
|:---:|:---:|:---:|
| ⚛️ | **React 18** | UI Framework |
| ⚡ | **Vite 5** | Build Tool |
| 🎨 | **Canvas API** | Grid & Diagonal Rendering |
| 🚀 | **GitHub Actions** | CI/CD |
| 🌐 | **GitHub Pages** | Hosting |

</div>

<br>

## 📁 Project Structure

```
diagonal-lattice-theorem/
│
├── 🌐 web/                          # React + Vite Web Application
│   ├── 📂 src/
│   │   ├── ⚛️ App.jsx              # Main component
│   │   ├── 🎨 App.css              # Styles
│   │   ├── 📄 main.jsx             # Entry point
│   │   └── 🎨 index.css            # Global styles
│   ├── 📂 public/
│   │   └── 📂 assets/              # Static files
│   ├── 📄 index.html
│   ├── 📄 package.json
│   └── ⚙️ vite.config.js
│
├── 🖼️ assets/                       # Images
│   └── 🏛️ Istanbul_Universitesi.png
│
├── 📂 src/                          # Original VB6 source code
│   ├── 📄 Form1.frm
│   ├── 📄 Project1.vbp
│   └── 📄 Project1.vbw
│
├── 📂 .github/workflows/            # CI/CD
│   └── 🚀 deploy.yml
│
├── 📜 README.md                     # This file
└── 📄 LICENSE                       # MIT License
```

<br>

## 📜 History

<div align="center">

| Version | Technology | Year | Status |
|:-------:|:---------:|:----:|:------:|
| 1.0 | Visual Basic 6.0 | 2009 | 📦 Archive |
| 2.0 | React + Vite | 2026 | ✅ Active |

Originally developed at **Istanbul University** in **2009** using VB6 for mathematics education.

Rebuilt in **2026** with modern web technologies (React + Vite).

</div>

<br>

## 👨‍💻 Developer

<div align="center">

<img src="https://github.com/bayramkotan.png" width="100" style="border-radius: 50%">

### **Bayram Kotan**

<img src="assets/Istanbul_Universitesi.png" alt="Istanbul University" width="60">

*Istanbul University - 2009*

[![GitHub](https://img.shields.io/badge/GitHub-bayramkotan-181717?style=for-the-badge&logo=github)](https://github.com/bayramkotan)

</div>

<br>

## 📄 License

<div align="center">

This project is licensed under the **MIT License**.

```
MIT License - Copyright (c) 2026 Bayram Kotan

Free to use, modify, and distribute.
```

</div>

<br>

---

<div align="center">

### ⭐ If you liked this project, don't forget to give it a star! ⭐

<br>

**Made with ❤️ by [Bayram Kotan](https://github.com/bayramkotan)**

<br>

<img src="assets/Istanbul_Universitesi.png" alt="Istanbul University" width="80">

*Istanbul University © 2009*

</div>
