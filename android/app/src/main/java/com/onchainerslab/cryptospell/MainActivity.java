package com.onchainerslab.cryptospell;

import com.getcapacitor.BridgeActivity;

import android.os.Bundle;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(SolanaMobilePlugin.class);
        super.onCreate(savedInstanceState);
    }
}
