/** Placeholder educator board: five India-based IB veterans, five global. */
export interface BoardMember {
  name: string;
  role: string;
  location: string;
  group: "india" | "global";
  initials: string;
}

export const BOARD: BoardMember[] = [
  {
    name: "Dr Anjali Deshpande",
    role: "Former IB DP Coordinator, 20 years",
    location: "Pune, India",
    group: "india",
    initials: "AD",
  },
  {
    name: "Rajesh Subramanian",
    role: "MYP Curriculum Lead and examiner",
    location: "Chennai, India",
    group: "india",
    initials: "RS",
  },
  {
    name: "Fatima Qureshi",
    role: "Head of School, IB World School",
    location: "Hyderabad, India",
    group: "india",
    initials: "FQ",
  },
  {
    name: "Dr Vivek Malhotra",
    role: "DP Mathematics examiner and trainer",
    location: "Delhi, India",
    group: "india",
    initials: "VM",
  },
  {
    name: "Sunita Pillai",
    role: "PYP specialist and workshop leader",
    location: "Bengaluru, India",
    group: "india",
    initials: "SP",
  },
  {
    name: "Dr Helen Whitaker",
    role: "IB curriculum researcher",
    location: "London, United Kingdom",
    group: "global",
    initials: "HW",
  },
  {
    name: "Marcus Lindqvist",
    role: "Former IB regional director",
    location: "Geneva, Switzerland",
    group: "global",
    initials: "ML",
  },
  {
    name: "Dr Amara Okonkwo",
    role: "Assessment and standards expert",
    location: "Toronto, Canada",
    group: "global",
    initials: "AO",
  },
  {
    name: "Yuki Tanaka",
    role: "MYP Design and innovation lead",
    location: "Singapore",
    group: "global",
    initials: "YT",
  },
  {
    name: "Sofia Reyes",
    role: "DP languages and literature examiner",
    location: "Madrid, Spain",
    group: "global",
    initials: "SR",
  },
];
