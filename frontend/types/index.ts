export type Role = "EMPLOYER" | "JOB_SEEKER";
export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "REMOTE"
  | "HYBRID"
  | "INTERNSHIP";
export type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";
export interface User {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  role: Role;
  avatar?: string;
  createdAt: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: string;
  jobType: JobType;
  categoryId: number;
  category: Category;
  employerId: number;
  employer: User;
  createdAt: string;
}

export type JobsParams = {
  q: string;
  location: string[];
  catId: string | number;
  jobType: string[];
};

export interface Category {
  id: number;
  name: string;
}

export interface Application {
  id: number;
  cvUrl: string;
  status: ApplicationStatus;
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
