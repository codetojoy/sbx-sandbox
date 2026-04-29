package services;

import javax.inject.Singleton;

@Singleton
public class PrimeService {

    public boolean isPrime(int n) {
        if (n < 2) return false;
        if (n == 2) return true;
        if (n % 2 == 0) return false;
        for (int i = 3; (long) i * i <= n; i += 2) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public boolean isPalindrome(int n) {
        if (n < 0) return false;
        int original = n;
        int reversed = 0;
        while (n > 0) {
            reversed = reversed * 10 + n % 10;
            n /= 10;
        }
        return original == reversed;
    }
}
