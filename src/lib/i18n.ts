export type Language = 'en' | 'kn';

export interface Translations {
  appName: string;
  tagline: string;
  prototypeBanner: string;
  prototypeNotice: string;
  languageToggle: string;
  nav: {
    home: string;
    map: string;
    report: string;
    news: string;
    more: string;
    issues: string;
    directory: string;
    departments: string;
    events: string;
    community: string;
    businesses: string;
    creators: string;
    profile: string;
    about: string;
    admin: string;
  };
  home: {
    welcome: string;
    subtitle: string;
    quickReport: string;
    quickReportDesc: string;
    exploreMap: string;
    exploreMapDesc: string;
    findOfficial: string;
    findOfficialDesc: string;
    localNews: string;
    localNewsDesc: string;
    statsTitle: string;
    statsSubtitle: string;
    totalIssues: string;
    activeIssues: string;
    resolvedIssues: string;
    upcomingEvents: string;
    recentIssuesTitle: string;
    viewAllIssues: string;
    mapPreviewTitle: string;
    openFullMap: string;
    newsSectionTitle: string;
    viewAllNews: string;
    eventsTitle: string;
    viewAllEvents: string;
    importantContactsTitle: string;
  };
  statuses: {
    SUBMITTED: string;
    UNDER_REVIEW: string;
    FORWARDED: string;
    IN_PROGRESS: string;
    RESOLVED: string;
    REOPENED: string;
  };
  categories: {
    GARBAGE_SANITATION: string;
    ROADS_POTHOLES: string;
    DRAINAGE_SEWAGE: string;
    STREETLIGHTS: string;
    WATER_SUPPLY: string;
    PUBLIC_INFRASTRUCTURE: string;
    PUBLIC_HEALTH_HOSPITAL: string;
    TRAFFIC_TRANSPORT: string;
    PARKS_PLAYGROUNDS: string;
    OTHER_CIVIC: string;
  };
  report: {
    title: string;
    subtitle: string;
    stepCategory: string;
    stepDetails: string;
    stepPhoto: string;
    stepLocation: string;
    stepReview: string;
    selectCategoryTitle: string;
    categoryHelp: string;
    issueTitleLabel: string;
    issueTitlePlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    photoLabel: string;
    photoHelp: string;
    takePhoto: string;
    uploadPhoto: string;
    removePhoto: string;
    locationLabel: string;
    locationHelp: string;
    useMyLocation: string;
    pinOnMap: string;
    addressLabel: string;
    addressPlaceholder: string;
    landmarkLabel: string;
    landmarkPlaceholder: string;
    zoneLabel: string;
    zoneTown: string;
    zoneTaluk: string;
    wardLabel: string;
    reviewTitle: string;
    reviewWarning: string;
    submitButton: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    ticketIdLabel: string;
    viewTicketButton: string;
    reportAnother: string;
  };
  map: {
    title: string;
    subtitle: string;
    legendTown: string;
    legendTaluk: string;
    legendIssues: string;
    filterAll: string;
    filterActive: string;
    filterResolved: string;
    filterReopened: string;
    filterCategory: string;
    talukExtent: string;
    approxBoundaryNotice: string;
    reportAtLocation: string;
    centerTown: string;
    centerTaluk: string;
  };
  directory: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterDepartment: string;
    allDepartments: string;
    departmentFinder: string;
    departmentFinderHelp: string;
    selectIssueType: string;
    recommendedDept: string;
    verifiedOfficial: string;
    communityRecorded: string;
    unverified: string;
    contactOffice: string;
    callNow: string;
    emailOffice: string;
    address: string;
    responsibility: string;
    lastVerified: string;
    source: string;
    emptyResults: string;
  };
  common: {
    search: string;
    filter: string;
    all: string;
    back: string;
    submit: string;
    cancel: string;
    save: string;
    close: string;
    demoTag: string;
    demoNotice: string;
    disclaimer: string;
    independentNotice: string;
    verified: string;
    unverified: string;
    readMore: string;
    sourceLink: string;
    publishedOn: string;
    hours: string;
    phone: string;
    address: string;
    resetDemo: string;
    resetDemoConfirm: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "Namma Gauribidanur",
    tagline: "Your Town. Your Voice. Our Community.",
    prototypeBanner: "Independent Civic Technology Prototype (Community Demo)",
    prototypeNotice: "This platform is an independent community prototype and is not officially affiliated with or endorsed by any government department. Demonstration records are simulated.",
    languageToggle: "ಕನ್ನಡ",
    nav: {
      home: "Home",
      map: "Issue Map",
      report: "Report",
      news: "News",
      more: "More",
      issues: "All Issues",
      directory: "Directory",
      departments: "Departments",
      events: "Events",
      community: "Noticeboard",
      businesses: "Businesses",
      creators: "Creators",
      profile: "Profile",
      about: "About & Trust",
      admin: "Admin Demo"
    },
    home: {
      welcome: "Namaskara, Gauribidanur!",
      subtitle: "Empowering residents of Gauribidanur town and taluk with civic reporting, local information, and community connection.",
      quickReport: "Report an Issue",
      quickReportDesc: "Potholes, streetlights, garbage, water leaks",
      exploreMap: "Live Issue Map",
      exploreMapDesc: "Interactive map of civic issues across town & taluk",
      findOfficial: "Public Officials",
      findOfficialDesc: "Search departments, contacts & responsibilities",
      localNews: "Sourced Local News",
      localNewsDesc: "Verified reporting from Gauribidanur & district",
      statsTitle: "Civic Activity Pulse",
      statsSubtitle: "Simulated demonstration statistics based on prototype data",
      totalIssues: "Total Reports",
      activeIssues: "Active / In Progress",
      resolvedIssues: "Resolved Demo Issues",
      upcomingEvents: "Upcoming Events",
      recentIssuesTitle: "Recent Civic Reports",
      viewAllIssues: "View All Reports",
      mapPreviewTitle: "Taluk & Town Issue Overview",
      openFullMap: "Open Interactive Map",
      newsSectionTitle: "Latest Local News & Sourced Reporting",
      viewAllNews: "Read All News",
      eventsTitle: "Community & Cultural Happenings",
      viewAllEvents: "Explore All Events",
      importantContactsTitle: "Essential Public Helplines"
    },
    statuses: {
      SUBMITTED: "Newly Reported",
      UNDER_REVIEW: "Under Review",
      FORWARDED: "Forwarded to Wing",
      IN_PROGRESS: "Work in Progress",
      RESOLVED: "Resolved",
      REOPENED: "Disputed / Reopened"
    },
    categories: {
      GARBAGE_SANITATION: "Garbage & Sanitation",
      ROADS_POTHOLES: "Roads & Potholes",
      DRAINAGE_SEWAGE: "Drainage & Overflow",
      STREETLIGHTS: "Streetlights & Poles",
      WATER_SUPPLY: "Drinking Water Supply",
      PUBLIC_INFRASTRUCTURE: "Public Infrastructure",
      PUBLIC_HEALTH_HOSPITAL: "Health & Hospital",
      TRAFFIC_TRANSPORT: "Traffic & Transit",
      PARKS_PLAYGROUNDS: "Parks & Green Spaces",
      OTHER_CIVIC: "Other Civic Matter"
    },
    report: {
      title: "Report a Civic Issue",
      subtitle: "File a community grievance for Gauribidanur town or surrounding villages. Your report generates a tracked demo complaint token.",
      stepCategory: "1. Category",
      stepDetails: "2. Details",
      stepPhoto: "3. Photos",
      stepLocation: "4. Location",
      stepReview: "5. Review",
      selectCategoryTitle: "Select Issue Category",
      categoryHelp: "Choose the area that best describes the civic problem you observed.",
      issueTitleLabel: "Brief Summary / Title",
      issueTitlePlaceholder: "e.g., Deep pothole on Railway Station Road",
      descriptionLabel: "Detailed Description",
      descriptionPlaceholder: "Describe what is broken, how long it has been there, and any safety hazards...",
      photoLabel: "Issue Photo (Optional / Recommended)",
      photoHelp: "Add a photograph showing the issue. In this prototype, images are handled securely in your browser.",
      takePhoto: "Take Photo (Camera)",
      uploadPhoto: "Select from Device",
      removePhoto: "Remove photo",
      locationLabel: "Issue Location",
      locationHelp: "Select location inside Gauribidanur Town (CMC) or Gauribidanur Taluk villages.",
      useMyLocation: "Use Current GPS",
      pinOnMap: "Click / Tap on Map to Pin Location",
      addressLabel: "Street / Colony / Landmark",
      addressPlaceholder: "e.g., Near Old Bus Stand, Ward 12",
      landmarkLabel: "Nearby Landmark (Optional)",
      landmarkPlaceholder: "e.g., Opposite State Bank",
      zoneLabel: "Administrative Zone",
      zoneTown: "Gauribidanur Town (CMC Wards)",
      zoneTaluk: "Gauribidanur Taluk (Rural / Hobli)",
      wardLabel: "Ward / Village Area",
      reviewTitle: "Review Your Civic Grievance",
      reviewWarning: "Notice: This will be saved as a local demonstration record. Personal reporter phone numbers and identities are never published.",
      submitButton: "Submit Civic Report",
      submitting: "Recording Demo Complaint...",
      successTitle: "Report Successfully Recorded!",
      successMessage: "Your demonstration grievance has been assigned an official tracking token and pinned to the live civic issue map.",
      ticketIdLabel: "Complaint Tracking ID",
      viewTicketButton: "View Issue Details & Timeline",
      reportAnother: "Report Another Issue"
    },
    map: {
      title: "Interactive Issue Map",
      subtitle: "Explore community issues across Gauribidanur Town and Taluk. Boundaries distinguish municipal and rural zones.",
      legendTown: "Town CMC Boundary (Illustrative)",
      legendTaluk: "Taluk Extent (Illustrative Bounding)",
      legendIssues: "Civic Complaints",
      filterAll: "All Issues",
      filterActive: "Active Only",
      filterResolved: "Resolved Only",
      filterReopened: "Reopened / Disputed",
      filterCategory: "Filter by Category",
      talukExtent: "Gauribidanur Taluk Extent",
      approxBoundaryNotice: "Illustrative Boundary Notice: Official Survey of India / K-GIS cadastral boundary integration pending. Extents shown are illustrative geographic representations.",
      reportAtLocation: "Report Issue Here",
      centerTown: "Center Town",
      centerTaluk: "View Full Taluk"
    },
    directory: {
      title: "Public Officials & Department Directory",
      subtitle: "Official contacts, office locations, and administrative responsibilities for Gauribidanur taluk and municipal administration.",
      searchPlaceholder: "Search official name, designation, department, or area...",
      filterDepartment: "Filter Department",
      allDepartments: "All Departments",
      departmentFinder: "Smart Department Routing Helper",
      departmentFinderHelp: "Not sure who to contact? Select your issue category to find the responsible body.",
      selectIssueType: "Select issue category...",
      recommendedDept: "Responsible Governing Body",
      verifiedOfficial: "Publicly Verified Official Contact",
      communityRecorded: "Community Recorded Contact",
      unverified: "Unverified / Needs Confirmation",
      contactOffice: "Contact Office",
      callNow: "Call Office",
      emailOffice: "Send Email",
      address: "Office Address",
      responsibility: "Core Responsibility",
      lastVerified: "Last Verified",
      source: "Source Traceability",
      emptyResults: "No officials or departments found matching your criteria."
    },
    common: {
      search: "Search",
      filter: "Filter",
      all: "All",
      back: "Back",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      close: "Close",
      demoTag: "Demo Record",
      demoNotice: "Simulated demonstration record for prototyping purposes.",
      disclaimer: "Disclaimer",
      independentNotice: "Independent Community Prototype",
      verified: "Verified",
      unverified: "Unverified",
      readMore: "Read More",
      sourceLink: "Original Source",
      publishedOn: "Published on",
      hours: "Hours",
      phone: "Phone",
      address: "Address",
      resetDemo: "Reset Demo Data",
      resetDemoConfirm: "Reset prototype data to original seeds? (Your submitted demo reports will be reinitialized)"
    }
  },
  kn: {
    appName: "ನಮ್ಮ ಗೌರಿಬಿದನೂರು",
    tagline: "ನಿಮ್ಮ ಊರು. ನಿಮ್ಮ ಧ್ವನಿ. ನಮ್ಮ ಸಮುದಾಯ.",
    prototypeBanner: "ಸ್ವತಂತ್ರ ನಾಗರಿಕ ತಂತ್ರಜ್ಞಾನ ಪ್ರೋಟೋಟೈಪ್ (ಸಮುದಾಯ ಡೆಮೊ)",
    prototypeNotice: "ಈ ವೇದಿಕೆಯು ಸ್ವತಂತ್ರ ನಾಗರಿಕ ಪ್ರೋಟೋಟೈಪ್ ಆಗಿದ್ದು, ಯಾವುದೇ ಸರ್ಕಾರಿ ಸಂಸ್ಥೆಯಿಂದ ಅಧಿಕೃತವಾಗಿ ಅನುಮೋದಿತವಾಗಿಲ್ಲ. ಪ್ರದರ್ಶಿಸಲಾದ ಅಂಕಿಅಂಶಗಳು ಮತ್ತು ದೂರುಗಳು ಡೆಮೊ ಉದ್ದೇಶಕ್ಕಾಗಿವೆ.",
    languageToggle: "English",
    nav: {
      home: "ಮುಖಪುಟ",
      map: "ಸಮಸ್ಯೆ ನಕ್ಷೆ",
      report: "ದೂರು ದಾಖಲಿಸಿ",
      news: "ಸುದ್ದಿ",
      more: "ಇನ್ನಷ್ಟು",
      issues: "ಎಲ್ಲಾ ದೂರುಗಳು",
      directory: "ಅಧಿಕಾರಿಗಳ ವಿವರ",
      departments: "ಇಲಾಖೆಗಳು",
      events: "ಕಾರ್ಯಕ್ರಮಗಳು",
      community: "ಸಮುದಾಯ ಫಲಕ",
      businesses: "ಸ್ಥಳೀಯ ವ್ಯಾಪಾರಗಳು",
      creators: "ಸ್ಥಳೀಯ ಕ್ರಿಯೇಟರ್ಸ್",
      profile: "ಪ್ರೊಫೈಲ್",
      about: "ಮಾಹಿತಿ ಮತ್ತು ಪಾರದರ್ಶಕತೆ",
      admin: "ಆಡಳಿತ ಡೆಮೊ"
    },
    home: {
      welcome: "ನಮಸ್ಕಾರ, ಗೌರಿಬಿದನೂರು!",
      subtitle: "ಗೌರಿಬಿದನೂರು ನಗರ ಮತ್ತು ತಾಲ್ಲೂಕಿನ ನಾಗರಿಕರಿಗೆ ದೂರು ಸಲ್ಲಿಕೆ, ಸ್ಥಳೀಯ ಮಾಹಿತಿ ಮತ್ತು ಸಮುದಾಯ ಸಂಪರ್ಕ ಒದಗಿಸುವ ವೇದಿಕೆ.",
      quickReport: "ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ",
      quickReportDesc: "ಗುಂಡಿಗಳು, ಬೀದಿದೀಪ, ಕಸ, ಕುಡಿಯುವ ನೀರಿನ ಸಮಸ್ಯೆಗಳು",
      exploreMap: "ನಾಗರಿಕ ನಕ್ಷೆ",
      exploreMapDesc: "ನಗರ ಮತ್ತು ತಾಲ್ಲೂಕಿನ ಸಮಸ್ಯೆಗಳ ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆ",
      findOfficial: "ಅಧಿಕಾರಿಗಳ ವಿವರ",
      findOfficialDesc: "ಇಲಾಖೆಗಳು, ಸಂಪರ್ಕ ಸಂಖ್ಯೆ ಮತ್ತು ಜವಾಬ್ದಾರಿಗಳ ಮಾಹಿತಿ",
      localNews: "ಸ್ಥಳೀಯ ಸುದ್ದಿ",
      localNewsDesc: "ಗೌರಿಬಿದನೂರು ಮತ್ತು ಜಿಲ್ಲೆಯ ನೈಜ ಮೂಲದ ವರದಿಗಳು",
      statsTitle: "ನಾಗರಿಕ ಚಟುವಟಿಕೆಗಳ ವಿವರ",
      statsSubtitle: "ಪ್ರೋಟೋಟೈಪ್ ಮಾದರಿಯ ಪ್ರದರ್ಶನಾ ಅಂಕಿಅಂಶಗಳು",
      totalIssues: "ಒಟ್ಟು ವರದಿಗಳು",
      activeIssues: "ಪ್ರಗತಿಯಲ್ಲಿರುವ ಸಮಸ್ಯೆಗಳು",
      resolvedIssues: "ಪರಿಹಾರವಾದ ಡೆಮೊ ಸಮಸ್ಯೆಗಳು",
      upcomingEvents: "ಮುಂದಿನ ಕಾರ್ಯಕ್ರಮಗಳು",
      recentIssuesTitle: "ಇತ್ತೀಚಿನ ನಾಗರಿಕ ವರದಿಗಳು",
      viewAllIssues: "ಎಲ್ಲಾ ವರದಿಗಳನ್ನು ನೋಡಿ",
      mapPreviewTitle: "ತಾಲ್ಲೂಕು ಮತ್ತು ನಗರ ಸಮಸ್ಯೆಗಳ ಅವಲೋಕನ",
      openFullMap: "ಸಂಪೂರ್ಣ ನಕ್ಷೆ ತೆರೆಯಿರಿ",
      newsSectionTitle: "ಇತ್ತೀಚಿನ ಸ್ಥಳೀಯ ಸುದ್ದಿಗಳು ಮತ್ತು ವರದಿಗಳು",
      viewAllNews: "ಎಲ್ಲಾ ಸುದ್ದಿಗಳನ್ನು ಓದಿ",
      eventsTitle: "ಸಮುದಾಯ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು",
      viewAllEvents: "ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ನೋಡಿ",
      importantContactsTitle: "ಪ್ರಮುಖ ಸಾರ್ವಜನಿಕ ಸಹಾಯವಾಣಿಗಳು"
    },
    statuses: {
      SUBMITTED: "ಹೊಸದಾಗಿ ದಾಖಲಿಸಲಾಗಿದೆ",
      UNDER_REVIEW: "ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ",
      FORWARDED: "ಸಂಬಂಧಿತ ಶಾಖೆಗೆ ರವಾನಿಸಲಾಗಿದೆ",
      IN_PROGRESS: "ಕಾಮಗಾರಿ ಪ್ರಗತಿಯಲ್ಲಿದೆ",
      RESOLVED: "ಪರಿಹರಿಸಲಾಗಿದೆ",
      REOPENED: "ಮರುಪರಿಶೀಲನೆಗೆ ಕೋರಲಾಗಿದೆ"
    },
    categories: {
      GARBAGE_SANITATION: "ಕಸ ಮತ್ತು ನೈರ್ಮಲ್ಯ",
      ROADS_POTHOLES: "ರಸ್ತೆಗಳು ಮತ್ತು ಗುಂಡಿಗಳು",
      DRAINAGE_SEWAGE: "ಚರಂಡಿ ಮತ್ತು ಒಳಚರಂಡಿ",
      STREETLIGHTS: "ಬೀದಿದೀಪಗಳು ಮತ್ತು ಕಂಬಗಳು",
      WATER_SUPPLY: "ಕುಡಿಯುವ ನೀರು ಸರಬರಾಜು",
      PUBLIC_INFRASTRUCTURE: "ಸಾರ್ವಜನಿಕ ಮೂಲಸೌಕರ್ಯ",
      PUBLIC_HEALTH_HOSPITAL: "ಆರೋಗ್ಯ ಮತ್ತು ಆಸ್ಪತ್ರೆ",
      TRAFFIC_TRANSPORT: "ಸಂಚಾರ ಮತ್ತು ಸಾರಿಗೆ",
      PARKS_PLAYGROUNDS: "ಉದ್ಯಾನವನ ಮತ್ತು ಆಟದ ಮೈದಾನ",
      OTHER_CIVIC: "ಇತರ ನಾಗರಿಕ ಸಮಸ್ಯೆ"
    },
    report: {
      title: "ನಾಗರಿಕ ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ",
      subtitle: "ಗೌರಿಬಿದನೂರು ನಗರ ಅಥವಾ ಸುತ್ತಮುತ್ತಲಿನ ಹಳ್ಳಿಗಳ ನಾಗರಿಕ ಕುಂದುಕೊರತೆಗಳನ್ನು ದಾಖಲಿಸಿ.",
      stepCategory: "೧. ವರ್ಗ",
      stepDetails: "೨. ವಿವರ",
      stepPhoto: "೩. ಫೋಟೋ",
      stepLocation: "೪. ಸ್ಥಳ",
      stepReview: "೫. ಪರಿಶೀಲನೆ",
      selectCategoryTitle: "ಸಮಸ್ಯೆಯ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      categoryHelp: "ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಉತ್ತಮವಾಗಿ ವಿವರಿಸುವ ವರ್ಗವನ್ನು ಆರಿಸಿ.",
      issueTitleLabel: "ಸಂಕ್ಷಿಪ್ತ ಶೀರ್ಷಿಕೆ",
      issueTitlePlaceholder: "ಉದಾಹರಣೆಗೆ: ರೈಲ್ವೆ ಸ್ಟೇಷನ್ ರಸ್ತೆಯಲ್ಲಿ ರಸ್ತೆ ಗುಂಡಿ",
      descriptionLabel: "ಸಂಪೂರ್ಣ ವಿವರಣೆ",
      descriptionPlaceholder: "ಸಮಸ್ಯೆಯ ಸ್ವರೂಪ ಮತ್ತು ಎಷ್ಟು ದಿನಗಳಿಂದ ಇದೆ ಎಂದು ವಿವರಿಸಿ...",
      photoLabel: "ಫೋಟೋ ಸೇರಿಸಿ (ಐಚ್ಛಿಕ)",
      photoHelp: "ಸಮಸ್ಯೆಯನ್ನು ತೋರಿಸುವ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
      takePhoto: "ಕ್ಯಾಮೆರಾ ಮೂಲಕ ಫೋಟೋ ತೆಗೆಯಿರಿ",
      uploadPhoto: "ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ",
      removePhoto: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
      locationLabel: "ಸಮಸ್ಯೆಯ ಸ್ಥಳ",
      locationHelp: "ಗೌರಿಬಿದನೂರು ನಗರ (ನಗರಸಭೆ) ಅಥವಾ ತಾಲ್ಲೂಕು ವ್ಯಾಪ್ತಿಯ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      useMyLocation: "ಪ್ರಸ್ತುತ ಜಿಪಿಎಸ್ ಬಳಸಿ",
      pinOnMap: "ನಕ್ಷೆಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ ಸ್ಥಳ ಗುರುತಿಸಿ",
      addressLabel: "ಬಡಾವಣೆ / ರಸ್ತೆ / ಗುರುತು",
      addressPlaceholder: "ಉದಾ: ಹಳೆ ಬಸ್ ನಿಲ್ದಾಣದ ಹತ್ತಿರ, ವಾರ್ಡ್ ೧೨",
      landmarkLabel: "ಹತ್ತಿರದ ಪ್ರಮುಖ ಗುರುತು (ಐಚ್ಛಿಕ)",
      landmarkPlaceholder: "ಉದಾ: ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಎದುರು",
      zoneLabel: "ಆಡಳಿತ ವ್ಯಾಪ್ತಿ",
      zoneTown: "ಗೌರಿಬಿದನೂರು ನಗರ (ನಗರಸಭೆ ವ್ಯಾಪ್ತಿ)",
      zoneTaluk: "ಗೌರಿಬಿದನೂರು ತಾಲ್ಲೂಕು (ಗ್ರಾಮೀಣ / ಹೋಬಳಿ)",
      wardLabel: "ವಾರ್ಡ್ ಅಥವಾ ಗ್ರಾಮ",
      reviewTitle: "ದೂರಿನ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
      reviewWarning: "ಸೂಚನೆ: ಇದು ಡೆಮೊ ದಾಖಲೆಯಾಗಿ ಸಂಗ್ರಹವಾಗುತ್ತದೆ. ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ಸಾರ್ವಜನಿಕವಾಗಿ ಪ್ರದರ್ಶಿಸಲಾಗುವುದಿಲ್ಲ.",
      submitButton: "ವರದಿ ಸಲ್ಲಿಸಿ",
      submitting: "ದಾಖಲಿಸಲಾಗುತ್ತಿದೆ...",
      successTitle: "ವರದಿ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ!",
      successMessage: "ನಿಮ್ಮ ದೂರಿಗೆ ಅಧಿಕೃತ ಟ್ರ್ಯಾಕಿಂಗ್ ಟೋಕನ್ ನೀಡಲಾಗಿದೆ ಮತ್ತು ನಕ್ಷೆಯಲ್ಲಿ ಗುರುತಿಸಲಾಗಿದೆ.",
      ticketIdLabel: "ದೂರು ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿ",
      viewTicketButton: "ದೂರಿನ ವಿವರ ಮತ್ತು ಪ್ರಗತಿ ನೋಡಿ",
      reportAnother: "ಮತ್ತೊಂದು ದೂರು ದಾಖಲಿಸಿ"
    },
    map: {
      title: "ಸಂವಾದಾತ್ಮಕ ಸಮಸ್ಯೆಗಳ ನಕ್ಷೆ",
      subtitle: "ಗೌರಿಬಿದನೂರು ನಗರ ಮತ್ತು ತಾಲ್ಲೂಕಿನ ಸಮಸ್ಯೆಗಳನ್ನು ನಕ್ಷೆಯಲ್ಲಿ ವೀಕ್ಷಿಸಿ.",
      legendTown: "ನಗರಸಭೆ ಗಡಿ (ಮಾದರಿ)",
      legendTaluk: "ತಾಲ್ಲೂಕು ವ್ಯಾಪ್ತಿ (ಮಾದರಿ)",
      legendIssues: "ನಾಗರಿಕ ದೂರುಗಳು",
      filterAll: "ಎಲ್ಲಾ ಸಮಸ್ಯೆಗಳು",
      filterActive: "ಪ್ರಗತಿಯಲ್ಲಿರುವವು",
      filterResolved: "ಪರಿಹರಿಸಿದವು",
      filterReopened: "ಮರುಪರಿಶೀಲನೆಯಲ್ಲಿರುವವು",
      filterCategory: "ವರ್ಗದ ಪ್ರಕಾರ ಫಿಲ್ಟರ್ ಮಾಡಿ",
      talukExtent: "ಗೌರಿಬಿದನೂರು ತಾಲ್ಲೂಕು ಗಡಿ",
      approxBoundaryNotice: "ಗಡಿ ಸೂಚನೆ: ಅಧಿಕೃತ ಸರ್ವೇ ಆಫ್ ಇಂಡಿಯಾ / ಕೆ-ಜಿಐಎಸ್ ಗಡಿಗಳ ಅನುಮೋದನೆ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ. ಪ್ರದರ್ಶಿಸಲಾದ ಗಡಿಗಳು ಪ್ರಾತಿನಿಧಿಕವಾಗಿವೆ.",
      reportAtLocation: "ಇಲ್ಲಿ ದೂರು ದಾಖಲಿಸಿ",
      centerTown: "ನಗರ ಕೇಂದ್ರ",
      centerTaluk: "ಸಂಪೂರ್ಣ ತಾಲ್ಲೂಕು"
    },
    directory: {
      title: "ಸಾರ್ವಜನಿಕ ಅಧಿಕಾರಿಗಳು ಮತ್ತು ಇಲಾಖೆಗಳು",
      subtitle: "ಗೌರಿಬಿದನೂರು ತಾಲ್ಲೂಕು ಮತ್ತು ನಗರಸಭೆಯ ಸಾರ್ವಜನಿಕ ಸಂಪರ್ಕ ವಿವರಗಳು ಹಾಗೂ ಕಚೇರಿ ವಿಳಾಸಗಳು.",
      searchPlaceholder: "ಹೆಸರು, ಹುದ್ದೆ, ಇಲಾಖೆ ಅಥವಾ ಪ್ರದೇಶವನ್ನು ಹುಡುಕಿ...",
      filterDepartment: "ಇಲಾಖೆಯನ್ನು ಆರಿಸಿ",
      allDepartments: "ಎಲ್ಲಾ ಇಲಾಖೆಗಳು",
      departmentFinder: "ಸಂಬಂಧಿತ ಇಲಾಖೆ ಹುಡುಕಾಟ ಸಹಾಯ",
      departmentFinderHelp: "ಯಾರಿಗೆ ದೂರು ನೀಡಬೇಕೆಂದು ತಿಳಿದಿಲ್ಲವೇ? ನಿಮ್ಮ ಸಮಸ್ಯೆಯ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      selectIssueType: "ಸಮಸ್ಯೆಯ ವರ್ಗವನ್ನು ಆರಿಸಿ...",
      recommendedDept: "ಜವಾಬ್ದಾರಿಯುತ ಇಲಾಖೆ",
      verifiedOfficial: "ಸಾರ್ವಜನಿಕವಾಗಿ ಪರಿಶೀಲಿತ ಅಧಿಕೃತ ಸಂಪರ್ಕ",
      communityRecorded: "ಸಮುದಾಯ ದಾಖಲಿತ ಸಂಪರ್ಕ",
      unverified: "ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ",
      contactOffice: "ಕಚೇರಿ ಸಂಪರ್ಕ",
      callNow: "ಕರೆ ಮಾಡಿ",
      emailOffice: "ಇಮೇಲ್ ಕಳುಹಿಸಿ",
      address: "ಕಚೇರಿ ವಿಳಾಸ",
      responsibility: "ಮುಖ್ಯ ಜವಾಬ್ದಾರಿ",
      lastVerified: "ಕೊನೆಯ ಪರಿಶೀಲನೆ",
      source: "ಮೂಲದ ವಿವರ",
      emptyResults: "ನೀವು ಹುಡುಕುತ್ತಿರುವ ವಿವರಗಳು ಕಂಡುಬಂದಿಲ್ಲ."
    },
    common: {
      search: "ಹುಡುಕಿ",
      filter: "ಫಿಲ್ಟರ್",
      all: "ಎಲ್ಲವೂ",
      back: "ಹಿಂದಕ್ಕೆ",
      submit: "ಸಲ್ಲಿಸಿ",
      cancel: "ರದ್ದುಮಾಡಿ",
      save: "ಉಳಿಸಿ",
      close: "ಮುಚ್ಚಿ",
      demoTag: "ಡೆಮೊ ದಾಖಲೆ",
      demoNotice: "ಪ್ರೋಟೋಟೈಪ್ ಪರೀಕ್ಷೆಗಾಗಿ ರೂಪಿಸಲಾದ ಡೆಮೊ ದಾಖಲೆ.",
      disclaimer: "ಹಕ್ಕುತ್ಯಾಗ",
      independentNotice: "ಸ್ವತಂತ್ರ ಸಮುದಾಯ ತಂತ್ರಜ್ಞಾನ",
      verified: "ಪರಿಶೀಲಿತ",
      unverified: "ಅಪೂರ್ಣ",
      readMore: "ಇನ್ನಷ್ಟು ಓದಿ",
      sourceLink: "ಮೂಲ ಲೇಖನ",
      publishedOn: "ಪ್ರಕಟಣೆ ದಿನಾಂಕ",
      hours: "ಸಮಯ",
      phone: "ದೂರವಾಣಿ",
      address: "ವಿಳಾಸ",
      resetDemo: "ಡೆಮೊ ಡೇಟಾ ಮರುಹೊಂದಿಸಿ",
      resetDemoConfirm: "ಪ್ರೋಟೋಟೈಪ್ ಡೇಟಾವನ್ನು ಮೂಲ ಸ್ಥಿತಿಗೆ ಮರುಹೊಂದಿಸಬೇಕೇ?"
    }
  }
};
