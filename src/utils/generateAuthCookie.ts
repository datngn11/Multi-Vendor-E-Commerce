import { cookies } from "next/headers";

interface IProps {
  prefix: string;
  value: string;
}
export const generateAuthCookie = async ({ prefix, value }: IProps) => {
  try {
    (await cookies()).set({
      httpOnly: true,
      name: `${prefix}-token`,
      path: "/",
      value,
    });
  } catch (error) {
    console.error("Failed to set auth cookie:", error);
  }
};
