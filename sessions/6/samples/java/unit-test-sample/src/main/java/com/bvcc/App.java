package com.bvcc;

public class App {
    public static void main(String[] args) {
        var numbers = new int[] { 1, 2, 3, 4, 5 };
        var value = 5;
        var index = binarySearch(numbers, 5, 0, numbers.length - 1);
        System.out.print(String.format("value: %s, index: %s", value, index));
    }

    public static int binarySearch(int[] numbers, int value, int left, int right) {
        if (left > right) {
            return -1;
        }

        var mid = (left + right) / 2;

        if (numbers[mid] == value) {
            return mid;
        }

        if (value < numbers[mid]) {
            return binarySearch(numbers, value, left, mid - 1);
        } else {
            return binarySearch(numbers, value, mid + 1, right);
        }
    }
}
