
// HR Management System Types

export interface Employee {
  id: string;
  employeeId: string;
  personalDetails: PersonalDetails;
  employmentDetails: EmploymentDetails;
  payrollInfo: PayrollInfo;
  documents: EmployeeDocument[];
  performanceNotes: PerformanceNote[];
  createdAt: string;
  updatedAt: string;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  nationalId: string;
  emergencyContact: EmergencyContact;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface EmploymentDetails {
  position: string;
  department: string;
  contractType: 'permanent' | 'contract' | 'temporary' | 'intern';
  startDate: string;
  endDate?: string;
  reportingManager: string;
  workLocation: string;
  employmentStatus: 'active' | 'on-leave' | 'terminated' | 'resigned';
}

export interface PayrollInfo {
  basicSalary: number;
  currency: string;
  payFrequency: 'monthly' | 'bi-weekly' | 'weekly';
  bankDetails: BankDetails;
  taxInfo: TaxInfo;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
}

export interface TaxInfo {
  taxId: string;
  allowances: number;
}

export interface EmployeeDocument {
  id: string;
  name: string;
  type: 'contract' | 'cv' | 'certificate' | 'id-document' | 'other';
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface PerformanceNote {
  id: string;
  date: string;
  type: 'review' | 'achievement' | 'concern' | 'goal';
  note: string;
  addedBy: string;
}

// Job Posting & Recruitment
export interface JobPosting {
  id: string;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'remote';
  status: 'draft' | 'active' | 'closed' | 'cancelled';
  postedBy: string;
  createdAt: string;
  closingDate: string;
  applicationsCount: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantName: string;
  email: string;
  phone: string;
  cvUrl: string;
  coverLetter: string;
  stage: 'applied' | 'shortlisted' | 'interviewed' | 'offered' | 'hired' | 'rejected';
  appliedAt: string;
  notes: ApplicationNote[];
  interviews: Interview[];
}

export interface ApplicationNote {
  id: string;
  note: string;
  addedBy: string;
  addedAt: string;
}

export interface Interview {
  id: string;
  scheduledDate: string;
  interviewers: string[];
  type: 'phone' | 'video' | 'in-person' | 'technical';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  feedback?: InterviewFeedback;
}

export interface InterviewFeedback {
  rating: number;
  strengths: string[];
  weaknesses: string[];
  recommendation: 'hire' | 'reject' | 'second-round';
  notes: string;
  submittedBy: string;
  submittedAt: string;
}

// Leave Management
export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  requestedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  comments?: string;
}

export type LeaveType = 'annual' | 'sick' | 'maternity' | 'paternity' | 'study' | 'family-responsibility' | 'unpaid';

export interface LeaveBalance {
  employeeId: string;
  leaveType: LeaveType;
  allocated: number;
  used: number;
  pending: number;
  remaining: number;
  year: number;
}

// Time & Attendance
export interface TimeEntry {
  id: string;
  employeeId: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  breakDuration: number;
  totalHours: number;
  overtime: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
  location?: string;
  notes?: string;
}

// Performance Management
export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewPeriod: {
    start: string;
    end: string;
  };
  type: 'probation' | 'quarterly' | 'annual' | 'promotion';
  status: 'draft' | 'in-progress' | 'completed' | 'approved';
  selfEvaluation?: Evaluation;
  managerEvaluation?: Evaluation;
  finalRating: number;
  promotionRecommended: boolean;
  salaryIncrementSuggested?: number;
  createdAt: string;
  completedAt?: string;
}

export interface Evaluation {
  kpis: KPIScore[];
  strengths: string[];
  areasForImprovement: string[];
  goals: Goal[];
  overallRating: number;
  comments: string;
}

export interface KPIScore {
  kpiId: string;
  name: string;
  target: number;
  achieved: number;
  score: number;
  weight: number;
}

export interface Goal {
  id: string;
  description: string;
  targetDate: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'overdue';
}

// Training & Development
export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'mandatory' | 'optional' | 'role-specific';
  duration: number; // in hours
  format: 'online' | 'classroom' | 'workshop' | 'webinar';
  materials: TrainingMaterial[];
  assessments: Assessment[];
  targetRoles: string[];
  targetDepartments: string[];
  createdBy: string;
  createdAt: string;
}

export interface TrainingMaterial {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'presentation' | 'document';
  url: string;
  duration?: number;
  sequence: number;
}

export interface Assessment {
  id: string;
  title: string;
  questions: Question[];
  passingScore: number;
  timeLimit: number; // in minutes
  attempts: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'essay';
  options?: string[];
  correctAnswer: string;
  points: number;
}

export interface TrainingEnrollment {
  id: string;
  employeeId: string;
  programId: string;
  enrolledAt: string;
  startedAt?: string;
  completedAt?: string;
  status: 'enrolled' | 'in-progress' | 'completed' | 'failed' | 'expired';
  progress: number; // percentage
  assessmentResults: AssessmentResult[];
  certificateUrl?: string;
}

export interface AssessmentResult {
  assessmentId: string;
  score: number;
  totalPoints: number;
  passed: boolean;
  attemptNumber: number;
  completedAt: string;
}

// Disciplinary & Compliance
export interface DisciplinaryCase {
  id: string;
  employeeId: string;
  type: 'misconduct' | 'performance' | 'attendance' | 'policy-violation' | 'other';
  severity: 'minor' | 'major' | 'gross';
  description: string;
  reportedBy: string;
  reportedAt: string;
  status: 'open' | 'investigating' | 'resolved' | 'escalated';
  actions: DisciplinaryAction[];
  documents: EmployeeDocument[];
}

export interface DisciplinaryAction {
  id: string;
  type: 'verbal-warning' | 'written-warning' | 'final-warning' | 'suspension' | 'termination';
  date: string;
  description: string;
  actionBy: string;
  followUpDate?: string;
  completed: boolean;
}

// Exit Management
export interface ExitProcess {
  id: string;
  employeeId: string;
  resignationType: 'voluntary' | 'involuntary' | 'retirement' | 'contract-end';
  resignationDate: string;
  lastWorkingDay: string;
  reason: string;
  exitInterviewCompleted: boolean;
  exitInterviewNotes?: string;
  handoverCompleted: boolean;
  clearanceStatus: ClearanceStatus;
  finalPayCalculated: boolean;
  finalPayAmount?: number;
}

export interface ClearanceStatus {
  it: boolean;
  finance: boolean;
  hr: boolean;
  facilities: boolean;
  directManager: boolean;
  completedAt?: string;
}

// Policy Management
export interface HRPolicy {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  version: string;
  effectiveDate: string;
  reviewDate: string;
  status: 'draft' | 'active' | 'archived';
  mandatory: boolean;
  acknowledgments: PolicyAcknowledgment[];
  documentUrl?: string;
  createdBy: string;
  createdAt: string;
}

export interface PolicyAcknowledgment {
  employeeId: string;
  acknowledgedAt: string;
  version: string;
}

// HR Analytics
export interface HRMetrics {
  totalEmployees: number;
  newHiresThisMonth: number;
  openPositions: number;
  trainingCompletionRate: number;
  pendingLeaveRequests: number;
  turnoverRate: number;
  averageTimeToHire: number;
  absenteeismRate: number;
  employeeSatisfactionScore: number;
}

export interface RecruitmentMetrics {
  totalApplications: number;
  shortlistedCandidates: number;
  interviewsScheduled: number;
  offersExtended: number;
  hiresCompleted: number;
  averageTimeToHire: number;
  costPerHire: number;
}
