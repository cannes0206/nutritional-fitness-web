import { UserDto } from "./user-dto";

export interface PhaseScheduleDto {
  phaseScheduleId: number;
  userId: number;
  user: UserDto;
  programPhaseId: number;
  programPhase: ProgramPhaseDto
  description: string;
  startDate: Date;
  endDate: Date;
  remainingDays: number;
}

export interface ProgramPhaseDto {
  programPhaseId: number;
  description?: string;
  daysInProgram?: string;
}

export interface CurrentPhaseDto {
  remainingDays: number,
  phaseScheduleId: number,
  userId: number,
  startDate?: Date,
  endDate?: Date,
}

export interface ResetUserPhaseScheduleToIndulgeDto {
  indulgeStartDate: Date,
  userId: number
}
