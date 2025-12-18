import { User, School } from '../types';
import { MOCK_USERS, MOCK_SCHOOLS } from '../constants';

export const verifySchoolCode = (code: string): School | undefined => {
  return MOCK_SCHOOLS.find(s => s.code.toUpperCase() === code.toUpperCase());
};

export const loginUser = (email: string, schoolId: string): User | undefined => {
  // Simulating password check by just checking email and school match
  return MOCK_USERS.find(u => u.email === email && u.schoolId === schoolId);
};
