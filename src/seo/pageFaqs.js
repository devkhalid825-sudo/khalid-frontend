// FAQ copy shared by the on-page accordion (PageFaq) and the FAQPage JSON-LD,
// so the visible answers always match the schema exactly.

export const CAPABILITIES_FAQS = [
  {
    q: 'What CAD and 3D file formats can Elipse Studio ingest?',
    a: 'Our pipeline ingests SolidWorks, STEP, IGES, Rhino, Revit, AutoCAD, FBX, and OBJ engineering files, converting heavy manufacturing assemblies into lightweight sub-2MB WebGL assets or Unreal Engine 5 Nanite meshes.',
  },
  {
    q: 'How does Elipse Studio choose between client-side WebGL and Unreal Engine 5 Pixel Streaming?',
    a: 'We use PlayCanvas or Three.js WebGL when brands need instant mobile loading and zero cloud server fees for high-traffic retail. We use Unreal Engine 5 Cloud Pixel Streaming when massive CAD assemblies or ray-traced Lumen reflections require cloud GPU rendering at sub-50ms WebRTC latency.',
  },
  {
    q: 'Can your 3D configurators integrate with Shopify Plus, HubSpot, and ERP systems?',
    a: 'Yes. Our interactive builds pass selected SKUs, dynamic pricing calculations, and BOM data via API directly into Shopify Plus checkout, HubSpot CRM deals, Salesforce CPQ, and custom ERP workflows.',
  },
  {
    q: 'Do you ship offline desktop or VR applications alongside web-based 3D?',
    a: 'Yes. For aviation, industrial training, and trade show sales galleries, we compile standalone Windows (.exe) and macOS desktop software as well as untethered Meta Quest VR builds with zero internet dependency.',
  },
];

export const ABOUT_FAQS = [
  {
    q: 'Where is Elipse Studio located, and how do you work with international clients?',
    a: "Elipse Studio's main 30+ specialist production and engineering team is headquartered in Karachi, supported by local sales representatives in Hanover Park, Illinois (USA), serving enterprise clients across North America, Europe, the Middle East, and APAC.",
  },
  {
    q: 'Do clients own the source code and 3D assets built by Elipse Studio?',
    a: 'Yes. Unlike SaaS configurator platforms that charge ongoing monthly licensing fees, Elipse Studio delivers custom WebGL, PlayCanvas, and Unreal Engine builds with full client IP ownership.',
  },
  {
    q: 'What CAD and 3D file formats can Elipse Studio ingest?',
    a: 'Our pipeline ingests SolidWorks, STEP, IGES, Rhino, Revit, AutoCAD, FBX, and OBJ engineering files, optimizing them for sub-2MB WebGL delivery or photorealistic Unreal Engine 5 rendering.',
  },
  {
    q: 'How long does a typical interactive 3D or VR project take to launch?',
    a: 'Standard WebGL configurators and commercial CGI campaigns ship in 4 to 8 weeks, while enterprise Unreal Engine 5 Pixel Streaming and multi-unit ArchViz suites typically deploy in 6 to 12 weeks.',
  },
];
