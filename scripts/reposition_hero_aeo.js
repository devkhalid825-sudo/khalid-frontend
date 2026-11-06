const fs = require('fs');
const path = require('path');

// 1. UPDATE ProductConfiguratorsPage.jsx
const confFile = path.join(__dirname, '..', 'src', 'components', 'services', 'ProductConfiguratorsPage.jsx');
let confCode = fs.readFileSync(confFile, 'utf8');

// Regex to capture from <h1 to end of hero top div before CarConfiguratorViewer
const oldConfHeroRegex = /<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-\[52px\] font-bold tracking-tight leading-\[1\.15\] text-white">[\s\S]*?<\/div>\s*<p className="text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-light text-zinc-300 max-w-2xl mx-auto">[\s\S]*?<\/p>\s*<\/div>\s*{\/\* Live Interactive Configurator Embed \(Where video was on ArchViz\) \*\/}\s*<CarConfiguratorViewer \/>/;

const newConfHero = `<h1 className="text-[clamp(1.5rem,4.2vw,3.25rem)] font-bold tracking-tight leading-[1.18] text-white max-w-5xl mx-auto">
            <span className="block">Custom 3D Product Configurators</span>
            <span className="block bg-gradient-to-r from-white via-[#8ca8ff] to-[#4169E1] bg-clip-text text-transparent">
              for eCommerce &amp; Web
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg mt-4 leading-relaxed font-light text-zinc-300 max-w-2xl mx-auto">
            Interact with our live WebGL automotive configurator below. Experience instant color switching, smooth orbit controls, and physically accurate PBR lighting calibrated for global brands.
          </p>
        </div>

        {/* Live Interactive Configurator Embed (Main Container) */}
        <CarConfiguratorViewer />

        {/* AEO Quick Summary Definition Box (Positioned below main container) */}
        <div className="max-w-4xl mx-auto mt-8 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-[#0E0E10] border border-[#4169E1]/30 text-left shadow-[0_4px_25px_rgba(65,105,225,0.08)]">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#4169E1] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#4169E1] font-semibold">
              AEO Quick Summary · 3D Configurator Definition
            </span>
          </div>
          <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-light">
            A 3D product configurator is an interactive web-based tool that allows customers to customize, rotate, and view products in real-time 360-degrees before purchasing. Built with WebGL, it boosts eCommerce conversion rates and reduces return rates by providing a highly immersive shopping experience.
          </p>
        </div>`;

if (oldConfHeroRegex.test(confCode)) {
  confCode = confCode.replace(oldConfHeroRegex, newConfHero);
  fs.writeFileSync(confFile, confCode, 'utf8');
  console.log('ProductConfiguratorsPage.jsx updated successfully.');
} else {
  console.log('Pattern not found in ProductConfiguratorsPage.jsx');
}

// 2. UPDATE ArchitecturalVisualizationPage.jsx
const archFile = path.join(__dirname, '..', 'src', 'components', 'services', 'ArchitecturalVisualizationPage.jsx');
let archCode = fs.readFileSync(archFile, 'utf8');

const oldArchHeroRegex = /<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-\[52px\] font-bold tracking-tight leading-\[1\.15\] text-white">[\s\S]*?<\/div>\s*<p className="text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-light text-zinc-300 max-w-2xl mx-auto">[\s\S]*?<\/p>\s*<\/div>\s*{\/\* Video Player \*\/}\s*<ArchvizVideoPlayer \/>/;

const newArchHero = `<h1 className="text-[clamp(1.5rem,4.2vw,3.25rem)] font-bold tracking-tight leading-[1.18] text-white max-w-5xl mx-auto">
            <span className="block">High-End 3D Architectural Visualization</span>
            <span className="block bg-gradient-to-r from-white via-[#8ca8ff] to-[#4169E1] bg-clip-text text-transparent">
              &amp; Real-Time VR
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg mt-4 leading-relaxed font-light text-zinc-300 max-w-2xl mx-auto">
            Experience our geometric precision, physically-based materials, and natural atmospheric lighting calibrated specifically for high-net-worth real estate buyers.
          </p>
        </div>

        {/* Video Player (Main Container) */}
        <ArchvizVideoPlayer />

        {/* AEO Quick Summary Definition Box (Positioned below main container) */}
        <div className="max-w-4xl mx-auto mt-8 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-[#0E0E10] border border-[#4169E1]/30 text-left shadow-[0_4px_25px_rgba(65,105,225,0.08)]">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#4169E1] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#4169E1] font-semibold">
              AEO Quick Summary · ArchViz Definition
            </span>
          </div>
          <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-light">
            Architectural Visualization (ArchViz) is the process of creating highly realistic 3D renderings, animations, and virtual reality (VR) walkthroughs of buildings before they are constructed. It helps real estate developers showcase properties with photorealistic accuracy.
          </p>
        </div>`;

if (oldArchHeroRegex.test(archCode)) {
  archCode = archCode.replace(oldArchHeroRegex, newArchHero);
  fs.writeFileSync(archFile, archCode, 'utf8');
  console.log('ArchitecturalVisualizationPage.jsx updated successfully.');
} else {
  console.log('Pattern not found in ArchitecturalVisualizationPage.jsx');
}

