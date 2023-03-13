export interface User {
  userId: number;
  //userTypeId: number;
  //userType: UserType;
  //userName: string;
  name: string;
  //email: string;
  //age: number;
  //genderId: number;
  //gender: Gender;
  //countryId: number;
  //country: Country;
  //bodyTypeId?: number;
  //bodyType: BodyType;
  //statusId?: number;
  //status?: Status;
  //programId: number;
  //program: Program;
  startDate: Date;
  //birthDate: Date;
  //active: boolean;
  //deleted: boolean;
  //encryptedId?: string;
  //coachDashboardMember?: CoachDashboardMember;
  programPhaseName: string;
  //programPhaseId: number;
  //hasQuestionnaire: boolean;
  //hasWeightGoal: boolean;
  //hasFuturePhaseSchedule: boolean;
  //hasAnnouncement: boolean;
  //hasMessage: boolean;
  startWeight: number;
  currentWeight: number;
  //weightDifference: string;
  statusName: string;
  //coachId?: number;
  //isUserInCurrentPhase: boolean;
}

export interface UserType {
  userTypeId: number;
  userTypeName: string;
}

export interface Gender {
  genderId: number;
  genderName: string;
}

export interface Country {
  countryId: number;
  countryName: string;
}

export interface BodyType {
  bodyTypeId: number;
  bodyTypeName: string;
}

export interface Status {
  statusId: number;
  statusName: string;
}

export interface Program {
  programId: number;
  programName: string;
}

export interface CoachDashboardMember {
  programId: number;
  programPhaseName: string;
  programPhaseId: number;
  startWeight: number;
  currentWeight: number;
  weightDifference: number;
  statusName: string;
  memberStartDate: Date;
}
