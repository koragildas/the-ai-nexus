
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'superadmin';
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  lastLogin?: string;
}

export interface SubmittedTool {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  url: string;
  category: string;
  pricing: string;
  rating: string;
  users: string;
  image?: string;
  features: string[];
  pros: string[];
  cons: string[];
  tags: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

export interface AdminStats {
  totalUsers: number;
  totalTools: number;
  pendingSubmissions: number;
  activeAdmins: number;
  monthlyGrowth: number;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'tools' | 'system' | 'content';
}
