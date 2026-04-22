import prisma from './prisma';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  isVerified: boolean;
  verificationToken?: string | null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    return user;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}

export async function findUserByVerificationToken(token: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { verificationToken: token },
    });
    return user;
  } catch (error) {
    console.error('Error finding user by verification token:', error);
    return null;
  }
}

export async function createUser(data: Omit<User, 'id' | 'isVerified'>): Promise<User | null> {
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash: data.passwordHash,
        verificationToken: data.verificationToken,
        isVerified: false,
      },
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  try {
    // Remove id from updates if it exists to prevent Prisma errors
    const { id: _, ...validUpdates } = updates;
    
    const user = await prisma.user.update({
      where: { id },
      data: validUpdates,
    });
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}
