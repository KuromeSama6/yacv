<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <BNavbar toggleable="lg" variant="dark" v-b-color-mode="'dark'">
        <BNavbarBrand href="#">YACM</BNavbarBrand>
        <BNavbarToggle target="nav-collapse" />
        <BCollapse id="nav-collapse" is-nav>
            <BNavbarNav>
                <BNavItem href="#">Home</BNavItem>
            </BNavbarNav>
            <!-- Right aligned nav items -->
            <BNavbarNav class="ms-auto mb-2 mb-lg-0">
                <BNavItemDropdown text="Language" right>
                    <BDropdownItem href="#">EN</BDropdownItem>
                    <BDropdownItem href="#">中文</BDropdownItem>
                </BNavItemDropdown>
                <BNavItemDropdown right>
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <em>User</em>
                    </template>
                    <BDropdownItem href="#">Profile</BDropdownItem>
                    <BDropdownItem href="#">Sign Out</BDropdownItem>
                </BNavItemDropdown>
            </BNavbarNav>
            <BNavForm class="d-flex">
                <BFormInput class="me-2" placeholder="Search for a Manga" />
                <BButton type="submit" variant="primary">Go</BButton>
            </BNavForm>
        </BCollapse>
    </BNavbar>
</template>
