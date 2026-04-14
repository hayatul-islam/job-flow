export interface User {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  role: "EMPLOYER" | "JOB_SEEKER";
  avatar?: string;
  createdAt: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: string;
  jobType: "FULL_TIME" | "PART_TIME" | "REMOTE" | "HYBRID" | "INTERNSHIP";
  categoryId: number;
  category: Category;
  employerId: number;
  employer: User;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Application {
  id: number;
  cvUrl: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  jobId: number;
  job: Job;
  userId: number;
  user: User;
  createdAt: string;
}

export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}
