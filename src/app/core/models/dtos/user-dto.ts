import { CoachDashboardMemberDto } from './coach-dashboard-member-dto';

export interface UserDto {
  userId: number;
  UserTypeId: number;
  UserType: UserTypeDto;
  userName: string;
  name: string;
  email: string;
  age: number;
  genderId: number;
  gender: GenderDto;
  countryId: number;
  country: CountryDto;
  bodyTypeId: number;
  bloodTypeId: number;
  bloodType: BloodTypeDto;
  statusId: number;
  status: StatusDto;
  programId: number;
  pragram: ProgramDto;
  startDate: string;
  birthDate: string;
  active: boolean;
  deleted: boolean;
  encryptedId: string;
  coachDashboardMember: CoachDashboardMemberDto;
  programPhaseName: string;
  programPhaseId: number;
  hasQuestionnaire: boolean;
  hasWeightGoal: boolean;
  hasFuturePhaseSchedule: boolean;
  hasAnnouncement: boolean;
  hasMessage: boolean;
  startWeight: number;
  currentWeight: number;
  weightDifference: string;
  statusName: string;
  coachId: number;
  isUserInCurrentPhase: boolean;
}

export interface BloodTypeDto {
  bloodTypeId: number;
  bloodTypeName: string;
}

export interface CountryDto {
  countryId: number;
  countryName: string;
}

export interface GenderDto {
  genderId: number;
  genderName: string;

}

export interface ProgramDto {
  programId: number;
  programName: string;
}

export interface UserTypeDto {
  userTypeId: number;
  userTypeName: string;
}

export interface StatusDto {
  statusId: number;
  statusName: string;
}

