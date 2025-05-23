// Client-side subscription management (simulated with localStorage for demo)

export class SubscriptionAPI {
  static async createSubscription(userId, planId, paymentData) {
    try {
      // In a real app, this would be a server API call
      const subscription = {
        id: `sub_${Date.now()}`,
        userId,
        planId,
        paymentId: paymentData.paymentId,
        orderId: paymentData.orderId,
        startTime: new Date().getTime(),
        duration: this.getPlanDuration(planId),
        status: "active",
        createdAt: new Date().toISOString(),
      };

      // Store subscription
      const subscriptions = JSON.parse(
        localStorage.getItem("subscriptions") || "[]"
      );
      subscriptions.push(subscription);
      localStorage.setItem("subscriptions", JSON.stringify(subscriptions));

      // Update user's current subscription
      localStorage.setItem("currentSubscription", JSON.stringify(subscription));

      return { success: true, subscription };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getUserSubscription(userId) {
    try {
      const subscriptions = JSON.parse(
        localStorage.getItem("subscriptions") || "[]"
      );
      const userSubscription = subscriptions
        .filter((sub) => sub.userId === userId && sub.status === "active")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

      if (userSubscription) {
        const currentTime = new Date().getTime();
        const endTime = userSubscription.startTime + userSubscription.duration;

        if (currentTime < endTime) {
          return {
            success: true,
            subscription: userSubscription,
            isActive: true,
          };
        } else {
          // Subscription expired
          await this.expireSubscription(userSubscription.id);
          return { success: true, subscription: null, isActive: false };
        }
      }

      return { success: true, subscription: null, isActive: false };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async expireSubscription(subscriptionId) {
    try {
      const subscriptions = JSON.parse(
        localStorage.getItem("subscriptions") || "[]"
      );
      const updatedSubscriptions = subscriptions.map((sub) =>
        sub.id === subscriptionId ? { ...sub, status: "expired" } : sub
      );

      localStorage.setItem(
        "subscriptions",
        JSON.stringify(updatedSubscriptions)
      );
      localStorage.removeItem("currentSubscription");

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async cancelSubscription(subscriptionId) {
    try {
      const subscriptions = JSON.parse(
        localStorage.getItem("subscriptions") || "[]"
      );
      const updatedSubscriptions = subscriptions.map((sub) =>
        sub.id === subscriptionId ? { ...sub, status: "cancelled" } : sub
      );

      localStorage.setItem(
        "subscriptions",
        JSON.stringify(updatedSubscriptions)
      );
      localStorage.removeItem("currentSubscription");

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static getPlanDuration(planId) {
    const durations = {
      day: 24 * 60 * 60 * 1000, // 1 day
      "three-day": 3 * 24 * 60 * 60 * 1000, // 3 days
      week: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    return durations[planId] || durations.day;
  }

  static async getSubscriptionHistory(userId) {
    try {
      const subscriptions = JSON.parse(
        localStorage.getItem("subscriptions") || "[]"
      );
      const userSubscriptions = subscriptions
        .filter((sub) => sub.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return { success: true, subscriptions: userSubscriptions };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
