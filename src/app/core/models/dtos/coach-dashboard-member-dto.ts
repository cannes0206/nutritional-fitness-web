export interface CoachDashboardMemberDto {
  programId: number;
  programPhaseName: string;
  programPhaseId: number;
  startWeight: number;
  currentWeight: number;
  weightDifference: number;
  statusName: string;
  memberStartDate: Date;
}
