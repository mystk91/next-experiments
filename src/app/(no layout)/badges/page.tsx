import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import ChatBadge from "@/app/ui/Badges/Chat Badge/badge";
import CardBadge from "@/app/ui/Badges/Card Badge/badge";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.badges}>
        <CardBadge
          name="Gabriel Johnston"
          src="/images/profile_images/gabriel.jpg"
          description={["Founder of Company Inc.", "Looking for new ideas! "]}
        />
        <CardBadge
          name="Sarah Karzoff"
          src="/images/profile_images/sarah.jpg"
          description={["Head of Marketing"]}
        />
        <CardBadge
          name="Roland Barket"
          src="/images/profile_images/roland.jpg"
          description={[
            "Column Writer",
            "Writer of a lot of words",
            "Conciseness Novice",
            "That's why I'm writing way more than I should!",
            "See? I just really like writing long sentences.",
          ]}
        />
        <CardBadge
          name="Noreen Martin"
          src="/images/profile_images/noreen.jpg"
          description={[
            "Sales Manager",
            "Expert Organizer",
            "Music Enthusiast",
            "Guitar & Flute",
          ]}
        />
        <CardBadge
          name="Rachel Karzoff"
          src="/images/profile_images/sarah.jpg"
          description={["Accounting", "Sarah's Twin Sister"]}
        />
      </div>


      <div className={styles.badges}>
        <ChatBadge
          name="Gabriel Johnston"
          src="/images/profile_images/gabriel.jpg"
          description={["Founder of Company Inc.", "Looking for new ideas! "]}
          status={"online"}
        />
        <ChatBadge
          name="Sarah Karzoff"
          src="/images/profile_images/sarah.jpg"
          description={["Head of Marketing"]}
          status={"offline"}
        />
        <ChatBadge
          name="Roland Barket"
          src="/images/profile_images/roland.jpg"
          description={[
            "Column Writer",
            "Writer of a lot of words",
            "Conciseness Novice",
            "That's what I'm writing way more than I should!",
          ]}
          status={"away"}
        />
        <ChatBadge
          name="Noreen Martin"
          src="/images/profile_images/noreen.jpg"
          description={[
            "Sales Manager",
            "Expert Organizer",
            "Music Enthusiast",
            "Guitar & Flute",
          ]}
          status={"online"}
        />
        <ChatBadge
          name="Rachel Karzoff"
          src="/images/profile_images/sarah.jpg"
          description={["Accounting", "Sarah's Twin Sister"]}
          status={"away"}
        />
      </div>
    </div>
  );
}
