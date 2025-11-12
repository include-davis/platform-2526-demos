import Counter from "@/app/(components)/Counter/Counter";
import styles from "./page.module.scss";
import GithubInfo from "@/app/(components)/GithubInfo/GithubInfo";

export default function Home() {
  return (
    <div className={styles.page}>
        <Counter/>
        <GithubInfo/>
    </div>
  );
}
