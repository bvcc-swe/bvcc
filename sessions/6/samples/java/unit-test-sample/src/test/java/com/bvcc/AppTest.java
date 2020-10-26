package com.bvcc;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class AppTest {
    /**
     * Tests that the binary search algorithm returns the correct index if 
     * the value is found in the array, otherwise -1.
     */
    @Test
    public void testBinarySearch() {
        var numbers = new int[] { 5, 6, 7, 8, 9 };
        // iterate over the values 5 - 10
        for (var i = 5; i < 11; i++) {
            var index = App.binarySearch(numbers, i, 0, numbers.length - 1);

            // if the value is greater than 9, we expect the binarySearch
            // method to return a -1 because the value is not in the array
            var expected = i > 9 ? -1 : i - 5;

            // assert that the value of the index is correct.
            assertEquals(expected, index);
        }
    }
}
