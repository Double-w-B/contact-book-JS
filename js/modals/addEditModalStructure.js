export const addEditModalStructure = `<form>
                        <div class="info-one">
                            <div class="name-input">
                                <input type="text" id="name" name="name" placeholder="Name*"
                                    onfocus="this.placeholder=''" onblur="this.placeholder='Name*'" required>
                                    <div class="error-hint">invalid name</div>
                                    <div class="error-hint-required">name is required</div>
                            </div>
                            <div class="surname-input">
                                <input type="text" id="surname" name="surname" placeholder="Surname*"
                                    onfocus="this.placeholder=''" onblur="this.placeholder='Surname*'" required>
                                    <div class="error-hint">invalid surname</div>
                                    <div class="error-hint-required">surname is required</div>

                            </div>
                            </div>
                            <div class="info-two">
                            <div class="phone-input">
                                <input type="text" id="phone" name="phone" maxlength="9" placeholder="Phone*" onfocus="this.placeholder=''" onblur="this.placeholder='Phone*'" required>
                                    <div class="error-hint">invalid number</div>
                                    <div class="error-hint-required">number is required</div>
                                    <div class="error-hint-number">number already exists</div>

                            </div>
                            <div class="mail-input">
                                <input type="email" id="email" name="email" placeholder="Email"
                                    onfocus="this.placeholder=''" onblur="this.placeholder='Email'" required>
                                    <div class="error-hint">invalid email</div>
                            </div>
                            </div>
                        </form>
                    </div>
                    <div class="new-con-secondary-info">
                        <form>
                            <div class="address-input">
                                <input type="text" id="address" name="address" placeholder="Address"
                                    onfocus="this.placeholder=''" onblur="this.placeholder='Address'">
                            </div>
                            <div class="notes-input">
                                <input type="text" id="notes" name="notes" maxlength="36" placeholder="Notes"
                                    onfocus="this.placeholder=''" onblur="this.placeholder='Notes'">
                            </div>
                        </form>
                    </div>
                    <div class="new-con-btns">`;
