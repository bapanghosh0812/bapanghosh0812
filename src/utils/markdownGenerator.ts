import { ProfileConfig, ProjectItem, CertificationItem } from "../data/profileData";

export function generateMarkdown(
  config: ProfileConfig,
  projects: ProjectItem[],
  certifications: CertificationItem[]
): string {
  const activeProjects = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.priority - b.priority);

  const typingEncoded = config.typingLines
    .map((line) => encodeURIComponent(line).replace(/%20/g, "+"))
    .join(";");

  return `<div align="center">

  <!-- ========================================== -->
  <!-- 1. BESPOKE ULTRA-LUXURY HERO HEADER BANNER -->
  <!-- ========================================== -->
  <a href="${config.portfolioUrl}">
    <img src="./assets/header-luxury.svg" width="100%" alt="${config.name} | SDE · Full-Stack & Systems Builder" />
  </a>

  <br/><br/>

  <!-- Profile Avatar with Holographic Neon Halo -->
  ${
    config.showAvatar
      ? `<p align="center">
    <a href="${config.portfolioUrl}" target="_blank">
      <img src="./assets/avatar.jpg" width="130" height="130" style="border-radius: 50%; object-fit: cover; border: 3px solid #38BDF8; box-shadow: 0 0 25px rgba(56, 189, 248, 0.45), 0 0 50px rgba(0, 242, 254, 0.2);" alt="${config.name}" />
    </a>
  </p>`
      : ""
  }

  <!-- Dynamic Typing Sub-Headline -->
  <a href="${config.portfolioUrl}">
    <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&duration=3000&pause=1200&color=38BDF8&center=true&vCenter=true&width=800&lines=${typingEncoded}" alt="Dynamic Headline" />
  </a>

  <br/>

  <!-- Live Metrics, Followers & Portfolio Dock -->
  <p align="center">
    <a href="https://github.com/${config.username}?tab=followers">
      <img src="https://img.shields.io/github/followers/${config.username}?label=Followers&logo=github&style=for-the-badge&color=050811&labelColor=0d1117&logoColor=38bdf8" alt="GitHub Followers" />
    </a>
    ${
      config.showViewsCounter
        ? `<a href="https://komarev.com/ghpvc/?username=${config.username}&style=for-the-badge&color=050811&labelColor=0d1117">
      <img src="https://komarev.com/ghpvc/?username=${config.username}&style=for-the-badge&color=050811&labelColor=0d1117" alt="Profile Views" />
    </a>`
        : ""
    }
    <a href="${config.portfolioUrl}" target="_blank">
      <img src="https://img.shields.io/badge/Live_Portfolio-00F2FE?style=for-the-badge&logo=netlify&logoColor=black&labelColor=050811" alt="Interactive Portfolio" />
    </a>
    <a href="https://play.google.com/store/apps/details?id=com.officialrescuen.app" target="_blank">
      <img src="https://img.shields.io/badge/Google_Play-34D399?style=for-the-badge&logo=googleplay&logoColor=white&labelColor=050811" alt="Google Play" />
    </a>
  </p>

  ${
    config.showSocialBadges
      ? `<!-- Connect Channels -->
  <p align="center">
    <a href="${config.linkedinUrl}" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=050811" alt="LinkedIn" />
    </a>
    <a href="${config.leetcodeUrl}" target="_blank">
      <img src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black&labelColor=050811" alt="LeetCode" />
    </a>
    <a href="mailto:${config.email}">
      <img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white&labelColor=050811" alt="Email" />
    </a>
    <a href="${config.whatsappUrl}" target="_blank">
      <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white&labelColor=050811" alt="WhatsApp" />
    </a>
  </p>`
      : ""
  }

  <!-- Luxury Laser Divider -->
  <img src="./assets/divider.svg" width="100%" alt="Divider" />

</div>

<br/>

### 👨‍💻 Executive Engineering Summary

\`\`\`yaml
engineer: ${config.name}
role: ${config.role}
education: ${config.education} @ ${config.college}
location: ${config.location}
status: 🟢 Available for SDE, Full-Stack & Mobile Engineering Internships
focus_areas:
  - Production Full-Stack Web (React, Next.js, Node.js, Express, MongoDB)
  - Production Mobile Engineering (Flutter, Android SDK, Published on Google Play)
  - Living Room TV Applications (Amazon Fire TV, React Native for TV, AWS Bedrock)
  - Hardware-Attested Cryptographic Protocols (Android StrongBox, BLE / NFC Offline Ledger)
\`\`\`

- 📱 **Shipped to Production:** Sole architect and deployer of **[Rescuen](https://play.google.com/store/apps/details?id=com.officialrescuen.app)**, a live Android safety application on the **Google Play Store** serving real-time SOS alerts with background GPS telemetry.
- 🛡️ **Fintech Cryptographic Protocol:** Designed **[Fortress UPI](https://github.com/bapanghosh0812/FORTRESS-UPI)**, an offline-resilient payment engine utilizing hardware-rooted keys (\`Android StrongBox / TEE\`), BLE/NFC transmission, and single-use pre-funded cryptographic notes (\`p99 < 15ms\`).
- 📺 **Living Room TV & Generative AI:** Built **[Storyloom on Amazon Fire TV](https://github.com/bapanghosh0812/Fire-TV-Amazon)** using React Native for TV, Amazon Bedrock AgentCore, Strands multi-agent pipelines, and AWS Polly speech synthesis.
- 💼 **Professional Experience:** Former AI/ML Intern at **EDU TANTR** (built core ML and vision models in Python) and Web Development Intern at **Cognifyz IT Solutions**.
- 🏆 **Industry Credentials:** Certified in **Oracle Cloud Infrastructure (OCI Generative AI)**, **Microsoft Azure (AZ-900)**, **IBM AI Foundations**, and **Google / Kaggle Agentic AI Intensive**.

<div align="center">
  <img src="./assets/divider.svg" width="100%" alt="Divider" />
</div>

<br/>

### 🛠️ Core Engineering Stack

> *A disciplined, battle-tested toolset focused on production delivery rather than buzzword inflation.*

<div align="center">
  <img src="./assets/tech-stack.svg" width="100%" alt="Engineering Domains and Tech Stack" />
</div>

<br/>

| Domain | Core Technologies & Tools | Production Application |
| :--- | :--- | :--- |
| **Full-Stack & Web** | \`TypeScript\` \`JavaScript (ES6+)\` \`React.js\` \`Next.js\` \`Node.js\` \`Express.js\` \`MongoDB\` \`Tailwind CSS\` \`REST APIs\` | College Campus Social Hub, WEARSUPER Store, GhoshKart |
| **Mobile & Living Room** | \`Flutter\` \`Dart\` \`Android SDK\` \`React Native for TV\` \`Firebase (Auth, DB, Functions)\` \`Google Maps Platform\` | Rescuen (Live Play Store), CutSlot, Storyloom Fire TV |
| **Cloud & DevOps Tools**| \`Docker\` \`Linux (Ubuntu)\` \`AWS (Bedrock, Polly)\` \`Git & GitHub\` \`Postman\` \`Netlify\` \`Vercel\` | Cloud-native deployments, containerized microservices |
| **Specialized R&D** | \`Android StrongBox / TEE\` \`BLE & NFC Protocols\` \`Multi-Agent AI (LangChain)\` \`OpenCV (CNN)\` \`Web Crypto API\` | Fortress UPI, Edge Face Mask Detection, Agent Assistant |

<div align="center">
  <img src="./assets/divider.svg" width="100%" alt="Divider" />
</div>

<br/>

### 🚀 Flagship Engineering Projects

| Project | Highlights & Engineering Summary | Core Stack | Live Links |
| :--- | :--- | :--- | :---: |
${activeProjects
  .map(
    (p) =>
      `| **${p.shortTitle}** | ${p.description} | ${p.tech
        .map((t) => `\`${t}\``)
        .join(" ")} | ${[
        p.playStoreUrl ? `[📱 Play Store](${p.playStoreUrl})` : null,
        p.liveUrl ? `[🌐 Demo](${p.liveUrl})` : null,
        p.githubUrl ? `[💻 Repo](${p.githubUrl})` : null,
      ]
        .filter(Boolean)
        .join(" · ")} |`
  )
  .join("\n")}

<br/>

<!-- ========================================== -->
<!-- INTERACTIVE SYSTEM ARCHITECTURE DEEP DIVES -->
<!-- ========================================== -->

<details>
<summary><b>🔬 Click to Expand: Fortress UPI Offline Cryptographic Architecture Deep Dive</b></summary>
<br/>

\`\`\`
[ Payer Device (Offline) ]                   [ Payee Device (Offline) ]
┌─────────────────────────────────┐          ┌─────────────────────────────────┐
│ Android StrongBox / TEE Keypair │          │ BLE Central / Peripheral Radio  │
│  - secp256r1 Key Attestation    │          │  - Dual UUID Service Discovery  │
│  - setMaxUsageCount(1) Note     │          │  - Ephemeral Session Keygen     │
└───────────────┬─────────────────┘          └────────────────┬────────────────┘
                │                                             │
                │ 1. Bluetooth Low Energy (BLE) Handshake     │
                ├────────────────────────────────────────────►│
                │ 2. ECDH Key Exchange & Session Nonce        │
                │◄────────────────────────────────────────────┤
                │ 3. Attested Payload (AES-256-GCM Encrypted) │
                ├────────────────────────────────────────────►│
                │                                             │
                ▼                                             ▼
       [ Signed Offline Note ]                       [ Encrypted Voucher ]
                │                                             │
                └──────────────────────┬──────────────────────┘
                                       │ 4. Connectivity Resumed
                                       ▼
                       [ Fortress Clearing Ledger (Go) ]
                       - Nonce De-duplication Verification
                       - Hardware Key Certificate Chain Validation
                       - Final Settlement on Central Banking Core
\`\`\`

**Key Engineering Highlights:**
- **Double-Spend Prevention Without Internet:** Single-use hardware key attestation (\`KeyGenParameterSpec.Builder.setMaxUsageCount(1)\`) guarantees that an offline token cannot be cryptographically forged or re-signed on device.
- **Microsecond Packet Transit:** Custom BLE advertisement packet packing avoids MTU fragmentation, completing offline verification in under 15ms.
</details>

<details>
<summary><b>📺 Click to Expand: Storyloom on Amazon Fire TV Architecture Deep Dive</b></summary>
<br/>

\`\`\`
[ Living Room 10-Foot UI ]
React Native for TV (Fire OS / Android TV Engine)
  │
  ├─► [ Amazon Bedrock AgentCore ]
  │     ├── Orchestrator: Multi-Agent Strands State Machine
  │     ├── Narrative Synthesis: Amazon Nova Micro / Lite Model
  │     └── Persona Engine: Dynamic Contextual Character Roles
  │
  ├─► [ AWS Polly Speech Pipeline ]
  │     └── Low-Latency Real-Time Audio Streaming Buffer (PCM Audio Stream)
  │
  └─► [ Fire TV Remote Focus Engine ]
        └── Hardware D-Pad Spatial Navigation & Turn-Based Family Co-Creation
\`\`\`
</details>

<div align="center">
  <img src="./assets/divider.svg" width="100%" alt="Divider" />
</div>

<br/>

### 📊 Real-Time GitHub Analytics & Activity

<div align="center">
  <table>
    <tr>
      <td width="50%">
        <img src="https://github-readme-stats.vercel.app/api?username=${config.username}&show_icons=true&theme=radical&hide_border=true&bg_color=050811&title_color=38BDF8&icon_color=00F2FE&text_color=94A3B8&border_color=1E293B" width="100%" alt="${config.name}'s GitHub Stats" />
      </td>
      ${
        config.showStreak
          ? `<td width="50%">
        <img src="https://github-readme-streak-stats.herokuapp.com/?user=${config.username}&theme=radical&hide_border=true&background=050811&ring=38BDF8&fire=00F2FE&currStreakNum=38BDF8&sideNums=94A3B8&currStreakLabel=38BDF8" width="100%" alt="Contribution Streak" />
      </td>`
          : ""
      }
    </tr>
    ${
      config.showTopLangs
        ? `<tr>
      <td colspan="2" align="center">
        <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${config.username}&layout=compact&theme=radical&hide_border=true&bg_color=050811&title_color=38BDF8&text_color=94A3B8&border_color=1E293B" width="60%" alt="Top Languages" />
      </td>
    </tr>`
        : ""
    }
  </table>

  <br/>

  <!-- GitHub Milestones Trophies -->
  ${
    config.showTrophies
      ? `<a href="https://github.com/ryo-ma/github-profile-trophy">
    <img src="https://github-profile-trophy.vercel.app/?username=${config.username}&theme=radical&no-frame=true&no-bg=false&margin-w=4" alt="GitHub Trophies" />
  </a>`
      : ""
  }

  <br/><br/>

  <!-- Dynamic Contribution Snake Game -->
  <p align="center">
    <b>🐍 24/7 Contribution Stream (Auto-Generated Daily via GitHub Actions)</b><br/>
    <img src="https://raw.githubusercontent.com/${config.username}/${config.username}/output/github-contribution-grid-snake-dark.svg" alt="GitHub Contribution Snake" width="100%" />
  </p>
</div>

<div align="center">
  <img src="./assets/divider.svg" width="100%" alt="Divider" />
</div>

<br/>

### 🎖️ Verified Accreditations & Certifications

| Certification / Credential | Issuing Organization | Year | Credential ID / Verification |
| :--- | :--- | :---: | :--- |
${certifications
  .map(
    (c) =>
      `| **${c.title}** | ${c.issuer} | ${c.date} | \`${c.credentialId || "Verified Credential"}\` |`
  )
  .join("\n")}

<div align="center">
  <img src="./assets/divider.svg" width="100%" alt="Divider" />
</div>

<br/>

### 📬 Executive Inquiries & Collaboration

<div align="center">

  <p>
    <b>Looking for a dedicated Software Engineering intern or a developer who ships real production code?</b><br/>
    Feel free to reach out directly — I typically respond within 24 hours.
  </p>

  <p>
    <a href="${config.portfolioUrl}" target="_blank">
      <img src="https://img.shields.io/badge/🌐_Interactive_Portfolio-bapanghosh.netlify.app-00F2FE?style=for-the-badge&labelColor=050811" alt="Portfolio" />
    </a>
    &nbsp;
    <a href="mailto:${config.email}">
      <img src="https://img.shields.io/badge/✉️_Direct_Email-${config.email}-EA4335?style=for-the-badge&labelColor=050811" alt="Email" />
    </a>
    &nbsp;
    <a href="${config.linkedinUrl}" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn_Profile-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=050811" alt="LinkedIn" />
    </a>
  </p>

  <br/>
  
  <p align="center">
    <sub>Designed with precision &amp; engineered for performance · © 2026 ${config.name}</sub>
  </p>

</div>`;
}
