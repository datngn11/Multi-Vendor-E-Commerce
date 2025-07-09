import { cookies } from "next/headers";

interface IProps {
  prefix: string;
  value: string;
}
export const generateAuthCookie = async ({ prefix, value }: IProps) => {
  (await cookies()).set({
    httpOnly: true,
    name: `${prefix}-token`,
    path: "/",
    value,
  });
};
