import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div>
            <h3 className={styles.footerLogo}>CineStream</h3>
            <p className={styles.footerDescription}>
              Premium cinematic experiences at your fingertips.
            </p>
            <div className={styles.socialLinks}>
              <Link to="#" className={styles.socialLink}>
                <Facebook size={20} />
              </Link>
              <Link to="#" className={styles.socialLink}>
                <Twitter size={20} />
              </Link>
              <Link to="#" className={styles.socialLink}>
                <Instagram size={20} />
              </Link>
              <Link to="#" className={styles.socialLink}>
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li className={styles.linkItem}>
                <Link to="/dashboard" className={styles.footerLink}>
                  Browse Content
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link to="/plans" className={styles.footerLink}>
                  Subscription Plans
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link to="#" className={styles.footerLink}>
                  About Us
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link to="#" className={styles.footerLink}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Legal</h4>
            <ul className={styles.footerLinks}>
              <li className={styles.linkItem}>
                <Link to="#" className={styles.footerLink}>
                  Terms of Service
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link to="#" className={styles.footerLink}>
                  Privacy Policy
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link to="#" className={styles.footerLink}>
                  Cookie Policy
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link to="#" className={styles.footerLink}>
                  Content Guidelines
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Contact Us</h4>
            <ul className={styles.footerLinks}>
              <li className={styles.contactItem}>
                <Mail size={16} />
                <span>support@cinestream.com</span>
              </li>
              <li className={styles.contactItem}>
                <Phone size={16} />
                <span>+91 123 456 7890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} CineStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
