import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { ShopProduct } from "@/components/content/RoomContent";
import { ContentSection } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

export default function ShopBookPage() {
  const room = getRoomById("shop")!;
  return (
    <RoomSubPage room={room} title="The Latter House Book" subtitle="The book that started it all">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <ShopProduct
          name="The Latter House"
          price="$18.99"
          description="Hardcover edition with ribbon bookmark"
          badge="Bestseller"
        />
        <ContentSection>
          <p>Discover how to shed old ways of thinking and embrace God&apos;s individual purpose 
          for your life. This groundbreaking work weaves together biblical truth and modern 
          neuroscience to help you build the latter house — greater than anything before.</p>
          <h2>What Readers Are Saying</h2>
          <p>&ldquo;This book changed how I see my future. At 63, I thought my best days were behind me. 
          Now I know God has something greater planned.&rdquo; — Margaret T., age 67</p>
        </ContentSection>
      </div>
    </RoomSubPage>
  );
}
