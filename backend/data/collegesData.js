const baseColleges = [
  { id: 1, name: "IIT Delhi", location: "New Delhi", type: "Government", rating: 4.8, est: 1961, fees: 250000, cutoff: "95%", courses: ["B.Tech", "M.Tech", "PhD"] },
  { id: 2, name: "IIT Bombay", location: "Mumbai", type: "Government", rating: 4.9, est: 1958, fees: 260000, cutoff: "96%", courses: ["B.Tech", "M.Tech", "MBA"] },
  { id: 3, name: "IIT Madras", location: "Chennai", type: "Government", rating: 4.8, est: 1959, fees: 250000, cutoff: "95%", courses: ["B.Tech", "M.Tech", "PhD"] },
  { id: 4, name: "IIT Kanpur", location: "Kanpur", type: "Government", rating: 4.7, est: 1959, fees: 240000, cutoff: "94%", courses: ["B.Tech", "M.Tech", "PhD"] },
  { id: 5, name: "IIT Kharagpur", location: "Kharagpur", type: "Government", rating: 4.6, est: 1951, fees: 230000, cutoff: "93%", courses: ["B.Tech", "M.Tech", "MBA"] },
  { id: 6, name: "NIT Trichy", location: "Trichy", type: "Government", rating: 4.7, est: 1964, fees: 220000, cutoff: "92%", courses: ["B.Tech", "M.Tech"] },
  { id: 7, name: "NIT Surathkal", location: "Surathkal", type: "Government", rating: 4.6, est: 1960, fees: 210000, cutoff: "91%", courses: ["B.Tech", "M.Tech"] },
  { id: 8, name: "BIT Mesra", location: "Ranchi", type: "Private", rating: 4.5, est: 1955, fees: 180000, cutoff: "90%", courses: ["B.Tech", "M.Tech", "MBA"] },
  { id: 9, name: "VIT Vellore", location: "Vellore", type: "Private", rating: 4.4, est: 1984, fees: 200000, cutoff: "89%", courses: ["B.Tech", "M.Tech", "MBA"] },
  { id: 10, name: "SRM Institute", location: "Chennai", type: "Private", rating: 4.3, est: 1985, fees: 190000, cutoff: "88%", courses: ["B.Tech", "M.Tech"] },
  { id: 11, name: "Anna University", location: "Chennai", type: "Government", rating: 4.2, est: 1978, fees: 120000, cutoff: "85%", courses: ["B.E", "M.E", "MBA"] },
  { id: 12, name: "Manipal Institute", location: "Manipal", type: "Private", rating: 4.3, est: 1953, fees: 180000, cutoff: "87%", courses: ["B.Tech", "M.Tech", "MBA"] },
  { id: 13, name: "Jamia Millia Islamia", location: "New Delhi", type: "Government", rating: 4.1, est: 1920, fees: 90000, cutoff: "80%", courses: ["B.Tech", "MBA"] },
  { id: 14, name: "Jadavpur University", location: "Kolkata", type: "Government", rating: 4.0, est: 1955, fees: 100000, cutoff: "82%", courses: ["B.Tech", "M.Tech"] },
  { id: 15, name: "Delhi University", location: "New Delhi", type: "Government", rating: 4.0, est: 1922, fees: 80000, cutoff: "78%", courses: ["B.A", "B.Sc", "B.Com"] },
  { id: 16, name: "BMS College", location: "Bangalore", type: "Private", rating: 3.9, est: 1946, fees: 150000, cutoff: "85%", courses: ["B.Tech", "MBA"] },
  { id: 17, name: "MIT Pune", location: "Pune", type: "Private", rating: 4.1, est: 1983, fees: 160000, cutoff: "86%", courses: ["B.Tech", "MBA", "M.Tech"] },
  { id: 18, name: "COEP Pune", location: "Pune", type: "Government", rating: 4.2, est: 1854, fees: 140000, cutoff: "87%", courses: ["B.Tech", "M.Tech"] },
  { id: 19, name: "Manipal College of Engineering", location: "Manipal", type: "Private", rating: 4.0, est: 1953, fees: 180000, cutoff: "85%", courses: ["B.Tech", "M.Tech"] },
  { id: 20, name: "Thapar Institute", location: "Patiala", type: "Private", rating: 4.1, est: 1956, fees: 170000, cutoff: "84%", courses: ["B.Tech", "M.Tech"] },
  { id: 21, name: "IIT Bhubaneswar", location: "Bhubaneswar", type: "Government", rating: 4.4, est: 2008, fees: 220000, cutoff: "91%", courses: ["B.Tech", "M.Tech"] },
  { id: 22, name: "IIT Gandhinagar", location: "Gandhinagar", type: "Government", rating: 4.3, est: 2008, fees: 210000, cutoff: "90%", courses: ["B.Tech", "M.Tech"] },
  { id: 23, name: "IIT Hyderabad", location: "Hyderabad", type: "Government", rating: 4.5, est: 2008, fees: 220000, cutoff: "92%", courses: ["B.Tech", "M.Tech"] },
  { id: 24, name: "IIT Indore", location: "Indore", type: "Government", rating: 4.4, est: 2009, fees: 210000, cutoff: "91%", courses: ["B.Tech", "M.Tech"] },
  { id: 25, name: "IIT Ropar", location: "Ropar", type: "Government", rating: 4.3, est: 2008, fees: 210000, cutoff: "90%", courses: ["B.Tech", "M.Tech"] },
  { id: 26, name: "IIT Guwahati", location: "Guwahati", type: "Government", rating: 4.6, est: 1994, fees: 230000, cutoff: "93%", courses: ["B.Tech", "M.Tech", "PhD"] },
  { id: 27, name: "IIT Patna", location: "Patna", type: "Government", rating: 4.2, est: 2008, fees: 210000, cutoff: "90%", courses: ["B.Tech", "M.Tech"] },
  { id: 28, name: "IIT Mandi", location: "Mandi", type: "Government", rating: 4.3, est: 2009, fees: 210000, cutoff: "91%", courses: ["B.Tech", "M.Tech"] },
  { id: 29, name: "IIT Palakkad", location: "Palakkad", type: "Government", rating: 4.2, est: 2015, fees: 200000, cutoff: "89%", courses: ["B.Tech", "M.Tech"] },
  { id: 30, name: "IIT Bhilai", location: "Bhilai", type: "Government", rating: 4.1, est: 2008, fees: 200000, cutoff: "88%", courses: ["B.Tech", "M.Tech"] },
  { id: 31, name: "IIT Goa", location: "Goa", type: "Government", rating: 4.0, est: 2016, fees: 190000, cutoff: "87%", courses: ["B.Tech", "M.Tech"] },
  { id: 32, name: "IIT Jammu", location: "Jammu", type: "Government", rating: 4.1, est: 2016, fees: 190000, cutoff: "87%", courses: ["B.Tech", "M.Tech"] },
  { id: 33, name: "IIT Dharwad", location: "Dharwad", type: "Government", rating: 4.0, est: 2016, fees: 190000, cutoff: "86%", courses: ["B.Tech", "M.Tech"] },
  { id: 34, name: "NIT Warangal", location: "Warangal", type: "Government", rating: 4.5, est: 1959, fees: 210000, cutoff: "92%", courses: ["B.Tech", "M.Tech"] },
  { id: 35, name: "NIT Jaipur", location: "Jaipur", type: "Government", rating: 4.4, est: 1963, fees: 210000, cutoff: "91%", courses: ["B.Tech", "M.Tech"] },
  { id: 36, name: "NIT Rourkela", location: "Rourkela", type: "Government", rating: 4.3, est: 1961, fees: 210000, cutoff: "90%", courses: ["B.Tech", "M.Tech"] },
  { id: 37, name: "NIT Calicut", location: "Calicut", type: "Government", rating: 4.2, est: 1961, fees: 210000, cutoff: "89%", courses: ["B.Tech", "M.Tech"] },
  { id: 38, name: "BMSCE", location: "Bangalore", type: "Private", rating: 4.1, est: 1946, fees: 150000, cutoff: "85%", courses: ["B.Tech", "MBA"] },
  { id: 39, name: "MIT Pune", location: "Pune", type: "Private", rating: 4.1, est: 1983, fees: 160000, cutoff: "86%", courses: ["B.Tech", "MBA", "M.Tech"] },
  { id: 40, name: "Manipal College of Engineering", location: "Manipal", type: "Private", rating: 4.0, est: 1953, fees: 180000, cutoff: "85%", courses: ["B.Tech", "M.Tech"] },
  { id: 41, name: "Thapar Institute", location: "Patiala", type: "Private", rating: 4.1, est: 1956, fees: 170000, cutoff: "84%", courses: ["B.Tech", "M.Tech"] },
  { id: 42, name: "SRM Institute", location: "Chennai", type: "Private", rating: 4.3, est: 1985, fees: 190000, cutoff: "88%", courses: ["B.Tech", "M.Tech"] },
  { id: 43, name: "VIT Vellore", location: "Vellore", type: "Private", rating: 4.4, est: 1984, fees: 200000, cutoff: "89%", courses: ["B.Tech", "M.Tech", "MBA"] },
  { id: 44, name: "Jamia Millia Islamia", location: "New Delhi", type: "Government", rating: 4.1, est: 1920, fees: 90000, cutoff: "80%", courses: ["B.Tech", "MBA"] },
  { id: 45, name: "Jadavpur University", location: "Kolkata", type: "Government", rating: 4.0, est: 1955, fees: 100000, cutoff: "82%", courses: ["B.Tech", "M.Tech"] },
  { id: 46, name: "Delhi University", location: "New Delhi", type: "Government", rating: 4.0, est: 1922, fees: 80000, cutoff: "78%", courses: ["B.A", "B.Sc", "B.Com"] },
  { id: 47, name: "Anna University", location: "Chennai", type: "Government", rating: 4.2, est: 1978, fees: 120000, cutoff: "85%", courses: ["B.E", "M.E", "MBA"] },
  { id: 48, name: "COEP Pune", location: "Pune", type: "Government", rating: 4.2, est: 1854, fees: 140000, cutoff: "87%", courses: ["B.Tech", "M.Tech"] },
  { id: 49, name: "BMS College of Engineering", location: "Bangalore", type: "Private", rating: 3.9, est: 1946, fees: 150000, cutoff: "85%", courses: ["B.Tech", "MBA"] },
  { id: 50, name: "IIT Patiala", location: "Patiala", type: "Government", rating: 4.1, est: 1965, fees: 200000, cutoff: "87%", courses: ["B.Tech", "M.Tech"] }
];

const COLLEGE_DATA = baseColleges.map((college) => ({
  ...college,
  logo:
    college.logo ||
    `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
      college.name
    )}&backgroundColor=gradientLinear&fontSize=42`,
}));

export const findCollegeById = (id) => {
  const targetId = Number(id);
  if (Number.isNaN(targetId)) {
    return null;
  }
  return COLLEGE_DATA.find((college) => college.id === targetId) || null;
};

export default COLLEGE_DATA;
