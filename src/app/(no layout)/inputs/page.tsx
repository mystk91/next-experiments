import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import TextInput from "@/app/ui/Inputs/Text Input - Trendy/textInput";
import TextInputWrapper from "@/app/ui/Inputs/Text Input Wrapper - Trendy/input_wrapper";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.input_container}>
        <TextInputWrapper
          id="username"
          name="username"
          label={"Username"}
          error={"That username is taken"}
        />
        <TextInputWrapper
          id="password"
          name="password"
          label={"Password"}
          type="password"
          togglePassword={true}
        />
      </div>
    </div>
  );
}
