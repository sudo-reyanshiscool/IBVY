import type {
  Course,
  Teacher,
  School,
  Enrolment,
  Certification,
  Vacancy,
  Application,
  Placement,
  StaffInvitation,
  PilotLead,
} from "@/lib/types";

/*
  Seeded demo dataset for the IBvy prototype. British English, no em dashes.
  Enough to make the full loop feel alive: teachers across training, certified
  and placed; established and transforming schools; vacancies, applications, a
  recorded placement, and pilot leads.
*/

// ---------------------------------------------------------------------------
// Courses (board-authored), each with modules, lessons and a 5-question test
// ---------------------------------------------------------------------------
export const COURSES: Course[] = [
  {
    id: "c-mhs",
    title: "MYP Individuals and Societies: Inquiry and Concepts",
    subject: "Individuals and Societies",
    programme: "MYP",
    level: "foundation",
    description:
      "Design conceptual, inquiry-led units for MYP Individuals and Societies, from statements of inquiry to criterion-referenced assessment.",
    durationHours: 18,
    published: true,
    modules: [
      {
        id: "m-mhs-1",
        title: "The MYP framework",
        lessons: [
          {
            id: "l-mhs-1-1",
            title: "Concepts, contexts and inquiry",
            durationMin: 25,
            content:
              "## Concept-driven learning\n\nMYP Individuals and Societies is built on key and related concepts. A strong unit begins with a **statement of inquiry** that connects a key concept (for example, *change*) to a global context (for example, *fairness and development*).\n\nIn this lesson we organise a unit around concepts rather than content coverage, so that students transfer understanding across time and place.",
          },
          {
            id: "l-mhs-1-2",
            title: "Writing statements of inquiry",
            durationMin: 30,
            content:
              "## From concept to statement\n\nA statement of inquiry expresses a transferable idea. We practise turning a key concept plus a global context plus related concepts into a single, debatable sentence that anchors the whole unit.",
          },
        ],
      },
      {
        id: "m-mhs-2",
        title: "Assessment and feedback",
        lessons: [
          {
            id: "l-mhs-2-1",
            title: "The four criteria",
            durationMin: 28,
            content:
              "## Criterion-referenced assessment\n\nIndividuals and Societies is assessed against four criteria: Knowing and understanding, Investigating, Communicating, and Thinking critically. We unpack each strand and design tasks that let every student demonstrate the top band.",
          },
          {
            id: "l-mhs-2-2",
            title: "Designing the summative task",
            durationMin: 32,
            content:
              "## Authentic summatives\n\nWe build a summative task aligned to the statement of inquiry, with a clear task-specific clarification of the criteria so marking is fair and transparent.",
          },
        ],
      },
    ],
    assessment: {
      title: "MYP Individuals and Societies: certification assessment",
      passingScore: 70,
      questions: [
        {
          id: "q-mhs-1",
          question: "What anchors an MYP unit of inquiry?",
          options: [
            "A list of content to cover",
            "A statement of inquiry",
            "A textbook chapter",
            "A single exam date",
          ],
          correctIndex: 1,
        },
        {
          id: "q-mhs-2",
          question: "How many assessment criteria does Individuals and Societies use?",
          options: ["Two", "Three", "Four", "Five"],
          correctIndex: 2,
        },
        {
          id: "q-mhs-3",
          question: "A statement of inquiry should be:",
          options: [
            "A transferable, debatable idea",
            "A factual recall question",
            "A homework instruction",
            "A grading rubric",
          ],
          correctIndex: 0,
        },
        {
          id: "q-mhs-4",
          question: "Global contexts in the MYP help students to:",
          options: [
            "Memorise dates",
            "Connect learning to real-world significance",
            "Avoid assessment",
            "Skip concepts",
          ],
          correctIndex: 1,
        },
        {
          id: "q-mhs-5",
          question: "A task-specific clarification is used to:",
          options: [
            "Hide the marking scheme",
            "Make criterion marking fair and transparent",
            "Replace the statement of inquiry",
            "Shorten the unit",
          ],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    id: "c-math",
    title: "DP Mathematics: Analysis and Approaches",
    subject: "Mathematics",
    programme: "DP",
    level: "advanced",
    description:
      "Teach the DP Mathematics: Analysis and Approaches course with confidence, from calculus to the toolkit and the internal assessment exploration.",
    durationHours: 24,
    published: true,
    modules: [
      {
        id: "m-math-1",
        title: "Course architecture",
        lessons: [
          {
            id: "l-math-1-1",
            title: "Analysis and Approaches vs Applications",
            durationMin: 22,
            content:
              "## Choosing the right course\n\nWe compare Analysis and Approaches with Applications and Interpretation, and map the syllabus so students at SL and HL are placed and challenged appropriately.",
          },
          {
            id: "l-math-1-2",
            title: "The mathematics toolkit",
            durationMin: 26,
            content:
              "## Thinking like a mathematician\n\nThe toolkit threads investigation, modelling and proof through every topic. We plan lessons that build these habits rather than teaching them in isolation.",
          },
        ],
      },
      {
        id: "m-math-2",
        title: "The internal assessment",
        lessons: [
          {
            id: "l-math-2-1",
            title: "Supervising the exploration",
            durationMin: 30,
            content:
              "## The mathematical exploration\n\nWe coach students to choose a personal, manageable exploration topic and to meet the five IA criteria, with checkpoints that keep academic integrity central.",
          },
        ],
      },
    ],
    assessment: {
      title: "DP Mathematics AA: certification assessment",
      passingScore: 70,
      questions: [
        {
          id: "q-math-1",
          question: "Analysis and Approaches places greater emphasis on:",
          options: [
            "Modelling with technology only",
            "Algebraic methods and proof",
            "Avoiding calculus",
            "Statistics exclusively",
          ],
          correctIndex: 1,
        },
        {
          id: "q-math-2",
          question: "The DP mathematics toolkit promotes:",
          options: [
            "Rote memorisation",
            "Investigation, modelling and proof",
            "Skipping the IA",
            "Calculator dependence",
          ],
          correctIndex: 1,
        },
        {
          id: "q-math-3",
          question: "How many criteria assess the mathematical exploration?",
          options: ["Three", "Four", "Five", "Six"],
          correctIndex: 2,
        },
        {
          id: "q-math-4",
          question: "A good exploration topic is:",
          options: [
            "Broad and impersonal",
            "Personal and manageable",
            "Copied from a textbook",
            "Unrelated to mathematics",
          ],
          correctIndex: 1,
        },
        {
          id: "q-math-5",
          question: "Academic integrity in the IA is supported by:",
          options: [
            "No supervision",
            "Regular checkpoints with the teacher",
            "Group submissions",
            "Hidden criteria",
          ],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    id: "c-eng",
    title: "DP English: Literature and the Learner",
    subject: "English",
    programme: "DP",
    level: "advanced",
    description:
      "Plan and assess DP English Literature across the three areas of exploration, building independent, text-attentive readers and writers.",
    durationHours: 20,
    published: true,
    modules: [
      {
        id: "m-eng-1",
        title: "Areas of exploration",
        lessons: [
          {
            id: "l-eng-1-1",
            title: "Readers, writers and texts",
            durationMin: 24,
            content:
              "## Close reading first\n\nThe first area of exploration centres on how meaning is constructed. We design lessons that slow students down and reward attention to language, structure and style.",
          },
          {
            id: "l-eng-1-2",
            title: "Time, space and intertextuality",
            durationMin: 24,
            content:
              "## Context and connection\n\nWe move outward to context and to the conversations between texts, preparing students for the comparative demands of the course.",
          },
        ],
      },
      {
        id: "m-eng-2",
        title: "Assessment",
        lessons: [
          {
            id: "l-eng-2-1",
            title: "The individual oral",
            durationMin: 28,
            content:
              "## A global issue, two texts\n\nWe prepare students for the individual oral, where they explore a global issue through one literary and, where relevant, one non-literary text.",
          },
        ],
      },
    ],
    assessment: {
      title: "DP English Literature: certification assessment",
      passingScore: 70,
      questions: [
        {
          id: "q-eng-1",
          question: "How many areas of exploration structure DP English?",
          options: ["Two", "Three", "Four", "Five"],
          correctIndex: 1,
        },
        {
          id: "q-eng-2",
          question: "The first area of exploration focuses on:",
          options: [
            "How meaning is constructed in texts",
            "Memorising plots",
            "Author biographies only",
            "Grammar drills",
          ],
          correctIndex: 0,
        },
        {
          id: "q-eng-3",
          question: "The individual oral is built around:",
          options: [
            "A spelling test",
            "A global issue explored through texts",
            "A group debate",
            "A closed-book exam",
          ],
          correctIndex: 1,
        },
        {
          id: "q-eng-4",
          question: "Intertextuality refers to:",
          options: [
            "Conversations between texts",
            "Texting in class",
            "A single text in isolation",
            "Ignoring context",
          ],
          correctIndex: 0,
        },
        {
          id: "q-eng-5",
          question: "Close reading rewards attention to:",
          options: [
            "Language, structure and style",
            "Word count only",
            "Cover design",
            "Publication date only",
          ],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "c-design",
    title: "MYP Design: The Design Cycle in Practice",
    subject: "Design",
    programme: "MYP",
    level: "foundation",
    description:
      "Run authentic MYP Design projects through the full design cycle, from inquiring and analysing to creating and evaluating the solution.",
    durationHours: 16,
    published: true,
    modules: [
      {
        id: "m-design-1",
        title: "The design cycle",
        lessons: [
          {
            id: "l-design-1-1",
            title: "Inquiring and analysing",
            durationMin: 22,
            content:
              "## Starting with a real problem\n\nWe ground projects in authentic client briefs, teaching students to research existing solutions and write a precise design brief.",
          },
          {
            id: "l-design-1-2",
            title: "Developing ideas",
            durationMin: 22,
            content:
              "## From specification to design\n\nStudents create a design specification, then generate and evaluate ideas against it before planning their chosen solution.",
          },
        ],
      },
      {
        id: "m-design-2",
        title: "Creating and evaluating",
        lessons: [
          {
            id: "l-design-2-1",
            title: "Testing the solution",
            durationMin: 24,
            content:
              "## Evidence-based evaluation\n\nWe design testing methods so students evaluate their solution against the specification and propose justified improvements.",
          },
        ],
      },
    ],
    assessment: {
      title: "MYP Design: certification assessment",
      passingScore: 70,
      questions: [
        {
          id: "q-design-1",
          question: "The MYP design cycle begins with:",
          options: [
            "Creating the solution",
            "Inquiring and analysing",
            "Evaluating",
            "Marking",
          ],
          correctIndex: 1,
        },
        {
          id: "q-design-2",
          question: "A design specification is used to:",
          options: [
            "Judge ideas and the final solution",
            "Replace the client brief",
            "Avoid testing",
            "Skip research",
          ],
          correctIndex: 0,
        },
        {
          id: "q-design-3",
          question: "Authentic projects are grounded in:",
          options: ["Random tasks", "A real client brief", "Exam papers", "Lectures"],
          correctIndex: 1,
        },
        {
          id: "q-design-4",
          question: "Evaluation in MYP Design should be:",
          options: [
            "Evidence-based against the specification",
            "Based on opinion only",
            "Skipped if time is short",
            "Done by the teacher alone",
          ],
          correctIndex: 0,
        },
        {
          id: "q-design-5",
          question: "How many stages are in the MYP design cycle?",
          options: ["Two", "Three", "Four", "Six"],
          correctIndex: 2,
        },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Teachers (supply side), spread across the loop
// ---------------------------------------------------------------------------
export const TEACHERS: Teacher[] = [
  {
    id: "t-priya",
    fullName: "Priya Nair",
    subjects: ["Individuals and Societies", "Geography"],
    yearsExperience: 6,
    currentCurriculum: "CBSE",
    qualifications: "MA History, B.Ed",
    city: "Mumbai",
    bio: "History and geography teacher moving into the MYP, keen on concept-led inquiry.",
    phone: "+91 98200 11223",
    programmes: ["MYP"],
    status: "certified",
    photoColour: "#1B3D6E",
  },
  {
    id: "t-arjun",
    fullName: "Arjun Rao",
    subjects: ["Mathematics"],
    yearsExperience: 9,
    currentCurriculum: "IB",
    qualifications: "MSc Mathematics, B.Ed",
    city: "Bengaluru",
    bio: "DP mathematics specialist with a focus on the exploration and analysis.",
    phone: "+91 98860 44556",
    programmes: ["DP"],
    status: "placed",
    photoColour: "#092045",
  },
  {
    id: "t-meera",
    fullName: "Meera Iyer",
    subjects: ["English"],
    yearsExperience: 4,
    currentCurriculum: "ICSE",
    qualifications: "MA English Literature",
    city: "Chennai",
    bio: "Literature teacher building towards the DP, drawn to close reading.",
    phone: "+91 94440 77889",
    programmes: ["DP"],
    status: "training",
    photoColour: "#9C7A3C",
  },
  {
    id: "t-vikram",
    fullName: "Vikram Singh",
    subjects: ["Design", "Digital Design"],
    yearsExperience: 7,
    currentCurriculum: "CBSE",
    qualifications: "B.Des, PGCE",
    city: "Delhi",
    bio: "Design teacher who runs project-based, client-led units.",
    phone: "+91 99100 33445",
    programmes: ["MYP"],
    status: "certified",
    photoColour: "#74879C",
  },
  {
    id: "t-ananya",
    fullName: "Ananya Das",
    subjects: ["Sciences", "Biology"],
    yearsExperience: 3,
    currentCurriculum: "CBSE",
    qualifications: "MSc Biology, B.Ed",
    city: "Kolkata",
    bio: "Early-career science teacher exploring the MYP sciences.",
    phone: "+91 98300 22110",
    programmes: ["MYP", "DP"],
    status: "training",
    photoColour: "#1B3D6E",
  },
  {
    id: "t-rahul",
    fullName: "Rahul Menon",
    subjects: ["Mathematics", "Physics"],
    yearsExperience: 8,
    currentCurriculum: "IB",
    qualifications: "MSc Physics, B.Ed",
    city: "Pune",
    bio: "Experienced DP mathematics and physics teacher, open to new roles.",
    phone: "+91 90040 55667",
    programmes: ["DP"],
    status: "open_to_offers",
    photoColour: "#092045",
  },
  {
    id: "t-sneha",
    fullName: "Sneha Kapoor",
    subjects: ["English"],
    yearsExperience: 5,
    currentCurriculum: "CBSE",
    qualifications: "MA English, B.Ed",
    city: "Jaipur",
    bio: "Existing staff member at Sunrise School, sponsored into MYP training.",
    phone: "+91 94140 88990",
    programmes: ["MYP"],
    status: "training",
    sponsoringSchoolId: "s-sunrise",
    photoColour: "#9C7A3C",
  },
  {
    id: "t-karthik",
    fullName: "Karthik Reddy",
    subjects: ["Individuals and Societies", "Economics"],
    yearsExperience: 6,
    currentCurriculum: "CBSE",
    qualifications: "MA Economics, B.Ed",
    city: "Jaipur",
    bio: "Sunrise School staff member upskilling towards the MYP.",
    phone: "+91 94130 12131",
    programmes: ["MYP"],
    status: "training",
    sponsoringSchoolId: "s-sunrise",
    photoColour: "#74879C",
  },
];

// ---------------------------------------------------------------------------
// Schools (demand side): established IB and one transforming
// ---------------------------------------------------------------------------
export const SCHOOLS: School[] = [
  {
    id: "s-heritage",
    schoolName: "The Heritage International School",
    schoolType: "established_ib",
    curriculaOffered: ["IB"],
    city: "Mumbai",
    website: "heritageintl.example.in",
    contactName: "Anand Mehta",
    contactPhone: "+91 22 4000 1000",
    size: "1200 students",
    verified: true,
  },
  {
    id: "s-oakridge",
    schoolName: "Oakridge World School",
    schoolType: "established_ib",
    curriculaOffered: ["IB", "IGCSE"],
    city: "Bengaluru",
    website: "oakridge.example.in",
    contactName: "Latha Krishnan",
    contactPhone: "+91 80 4000 2000",
    size: "900 students",
    verified: false,
  },
  {
    id: "s-silverdale",
    schoolName: "Silverdale Academy",
    schoolType: "established_ib",
    curriculaOffered: ["IB"],
    city: "Delhi",
    website: "silverdale.example.in",
    contactName: "Rohit Bansal",
    contactPhone: "+91 11 4000 3000",
    size: "1500 students",
    verified: true,
  },
  {
    id: "s-sunrise",
    schoolName: "Sunrise School",
    schoolType: "transforming",
    curriculaOffered: ["CBSE"],
    city: "Jaipur",
    website: "sunrise.example.in",
    contactName: "Kavita Sharma",
    contactPhone: "+91 141 400 4000",
    size: "800 students",
    verified: false,
  },
];

// ---------------------------------------------------------------------------
// Enrolments and progress
// ---------------------------------------------------------------------------
export const ENROLMENTS: Enrolment[] = [
  {
    id: "e-priya-mhs",
    teacherId: "t-priya",
    courseId: "c-mhs",
    status: "completed",
    progressPct: 100,
    completedLessonIds: ["l-mhs-1-1", "l-mhs-1-2", "l-mhs-2-1", "l-mhs-2-2"],
  },
  {
    id: "e-arjun-math",
    teacherId: "t-arjun",
    courseId: "c-math",
    status: "completed",
    progressPct: 100,
    completedLessonIds: ["l-math-1-1", "l-math-1-2", "l-math-2-1"],
  },
  {
    id: "e-rahul-math",
    teacherId: "t-rahul",
    courseId: "c-math",
    status: "completed",
    progressPct: 100,
    completedLessonIds: ["l-math-1-1", "l-math-1-2", "l-math-2-1"],
  },
  {
    id: "e-vikram-design",
    teacherId: "t-vikram",
    courseId: "c-design",
    status: "completed",
    progressPct: 100,
    completedLessonIds: ["l-design-1-1", "l-design-1-2", "l-design-2-1"],
  },
  {
    id: "e-meera-eng",
    teacherId: "t-meera",
    courseId: "c-eng",
    status: "in_progress",
    progressPct: 33,
    completedLessonIds: ["l-eng-1-1"],
  },
  {
    id: "e-ananya-mhs",
    teacherId: "t-ananya",
    courseId: "c-mhs",
    status: "in_progress",
    progressPct: 25,
    completedLessonIds: ["l-mhs-1-1"],
  },
  {
    id: "e-sneha-eng",
    teacherId: "t-sneha",
    courseId: "c-eng",
    status: "in_progress",
    progressPct: 67,
    sponsoredBySchoolId: "s-sunrise",
    completedLessonIds: ["l-eng-1-1", "l-eng-1-2"],
  },
  {
    id: "e-karthik-mhs",
    teacherId: "t-karthik",
    courseId: "c-mhs",
    status: "in_progress",
    progressPct: 50,
    sponsoredBySchoolId: "s-sunrise",
    completedLessonIds: ["l-mhs-1-1", "l-mhs-1-2"],
  },
];

// ---------------------------------------------------------------------------
// Certifications
// ---------------------------------------------------------------------------
export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-priya-mhs",
    teacherId: "t-priya",
    courseId: "c-mhs",
    certificateNumber: "IBVY-2026-7K2M9A",
    status: "issued",
    issuedAt: "2026-03-14",
  },
  {
    id: "cert-arjun-math",
    teacherId: "t-arjun",
    courseId: "c-math",
    certificateNumber: "IBVY-2026-3P8Q1Z",
    status: "issued",
    issuedAt: "2026-02-02",
  },
  {
    id: "cert-rahul-math",
    teacherId: "t-rahul",
    courseId: "c-math",
    certificateNumber: "IBVY-2026-9F4D6L",
    status: "issued",
    issuedAt: "2026-04-21",
  },
  {
    id: "cert-vikram-design",
    teacherId: "t-vikram",
    courseId: "c-design",
    certificateNumber: "IBVY-2026-5T1R8C",
    status: "issued",
    issuedAt: "2026-05-09",
  },
];

// ---------------------------------------------------------------------------
// Vacancies
// ---------------------------------------------------------------------------
export const VACANCIES: Vacancy[] = [
  {
    id: "v-heritage-mhs",
    schoolId: "s-heritage",
    title: "MYP Individuals and Societies Teacher",
    subject: "Individuals and Societies",
    programme: "MYP",
    level: "MYP",
    description:
      "Teach MYP Individuals and Societies across years 1 to 5, with a concept-led, inquiry-based approach.",
    requirements: "IBvy certification or equivalent. Two years teaching experience.",
    location: "Mumbai",
    salaryRange: "INR 9 to 12 lakh per annum",
    status: "open",
    postedAt: "2026-05-20",
  },
  {
    id: "v-heritage-eng",
    schoolId: "s-heritage",
    title: "DP English Literature Teacher",
    subject: "English",
    programme: "DP",
    level: "DP",
    description:
      "Lead DP English Literature, supporting students through the areas of exploration and the individual oral.",
    requirements: "DP experience preferred. Strong subject knowledge.",
    location: "Mumbai",
    salaryRange: "INR 11 to 15 lakh per annum",
    status: "open",
    postedAt: "2026-06-01",
  },
  {
    id: "v-oakridge-math",
    schoolId: "s-oakridge",
    title: "DP Mathematics: Analysis and Approaches Teacher",
    subject: "Mathematics",
    programme: "DP",
    level: "DP",
    description:
      "Teach DP Mathematics AA at SL and HL, and supervise the mathematical exploration.",
    requirements: "Strong mathematics degree. IBvy certification welcomed.",
    location: "Bengaluru",
    salaryRange: "INR 12 to 16 lakh per annum",
    status: "open",
    postedAt: "2026-06-10",
  },
  {
    id: "v-silverdale-design",
    schoolId: "s-silverdale",
    title: "MYP Design Teacher",
    subject: "Design",
    programme: "MYP",
    level: "MYP",
    description:
      "Run authentic, project-based MYP Design units through the full design cycle.",
    requirements: "Design background and a portfolio of student work.",
    location: "Delhi",
    salaryRange: "INR 9 to 13 lakh per annum",
    status: "open",
    postedAt: "2026-06-12",
  },
  {
    id: "v-silverdale-math",
    schoolId: "s-silverdale",
    title: "DP Mathematics Teacher",
    subject: "Mathematics",
    programme: "DP",
    level: "DP",
    description: "DP mathematics role, now filled through IBvy.",
    requirements: "DP experience.",
    location: "Delhi",
    salaryRange: "INR 12 to 16 lakh per annum",
    status: "filled",
    postedAt: "2026-03-01",
  },
];

// ---------------------------------------------------------------------------
// Applications
// ---------------------------------------------------------------------------
export const APPLICATIONS: Application[] = [
  {
    id: "a-priya-heritage-mhs",
    vacancyId: "v-heritage-mhs",
    teacherId: "t-priya",
    status: "shortlisted",
    coverNote:
      "I have just certified through IBvy in MYP Individuals and Societies and would love to bring concept-led inquiry to Heritage.",
    invitedBySchool: false,
    appliedAt: "2026-06-02",
  },
  {
    id: "a-rahul-oakridge-math",
    vacancyId: "v-oakridge-math",
    teacherId: "t-rahul",
    status: "interview",
    coverNote: "Eight years of DP mathematics, certified through IBvy.",
    invitedBySchool: true,
    appliedAt: "2026-06-14",
  },
  {
    id: "a-vikram-silverdale-design",
    vacancyId: "v-silverdale-design",
    teacherId: "t-vikram",
    status: "applied",
    coverNote: "Project-based MYP Design specialist, keen to join Silverdale.",
    invitedBySchool: false,
    appliedAt: "2026-06-15",
  },
  {
    id: "a-arjun-silverdale-math",
    vacancyId: "v-silverdale-math",
    teacherId: "t-arjun",
    status: "hired",
    coverNote: "DP mathematics specialist.",
    invitedBySchool: false,
    appliedAt: "2026-02-20",
  },
];

// ---------------------------------------------------------------------------
// Placements (the revenue event)
// ---------------------------------------------------------------------------
export const PLACEMENTS: Placement[] = [
  {
    id: "p-arjun-silverdale",
    vacancyId: "v-silverdale-math",
    teacherId: "t-arjun",
    schoolId: "s-silverdale",
    placementFee: 150000,
    feeStatus: "paid",
    placedAt: "2026-03-05",
  },
];

// ---------------------------------------------------------------------------
// Staff invitations (market one)
// ---------------------------------------------------------------------------
export const STAFF_INVITATIONS: StaffInvitation[] = [
  {
    id: "inv-sneha",
    schoolId: "s-sunrise",
    teacherEmail: "sneha.kapoor@sunrise.example.in",
    teacherName: "Sneha Kapoor",
    status: "accepted",
    createdAt: "2026-04-01",
  },
  {
    id: "inv-karthik",
    schoolId: "s-sunrise",
    teacherEmail: "karthik.reddy@sunrise.example.in",
    teacherName: "Karthik Reddy",
    status: "accepted",
    createdAt: "2026-04-01",
  },
  {
    id: "inv-deepa",
    schoolId: "s-sunrise",
    teacherEmail: "deepa.nair@sunrise.example.in",
    teacherName: "Deepa Nair",
    status: "pending",
    createdAt: "2026-06-18",
  },
];

// ---------------------------------------------------------------------------
// Pilot leads (from the marketing forms)
// ---------------------------------------------------------------------------
export const PILOT_LEADS: PilotLead[] = [
  {
    id: "lead-greenwood",
    schoolName: "Greenwood High",
    contactName: "Sunil Verma",
    email: "principal@greenwood.example.in",
    phone: "+91 80 5000 1000",
    city: "Bengaluru",
    schoolType: "transforming",
    message: "We are a CBSE school exploring a move to the MYP and want to upskill our staff.",
    status: "new",
    createdAt: "2026-06-20",
  },
  {
    id: "lead-asianworld",
    schoolName: "Asian World Academy",
    contactName: "Farah Khan",
    email: "head@asianworld.example.in",
    phone: "+91 44 5000 2000",
    city: "Chennai",
    schoolType: "established_ib",
    message: "We have three open DP vacancies and struggle to find certified teachers.",
    status: "contacted",
    createdAt: "2026-06-16",
  },
  {
    id: "lead-newhorizon",
    schoolName: "New Horizon School",
    contactName: "Imran Sheikh",
    email: "admin@newhorizon.example.in",
    city: "Hyderabad",
    schoolType: "transforming",
    message: "Interested in the transforming-to-IB pathway.",
    status: "new",
    createdAt: "2026-06-22",
  },
];

// The default placement fee shown when a hire is confirmed in the prototype.
export const DEMO_PLACEMENT_FEE = 150000;
